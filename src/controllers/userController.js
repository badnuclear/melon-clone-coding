import { async } from "regenerator-runtime";
import fetch from "cross-fetch";
import User from "../models/User";

//소셜 카카오 로그인
export const startKakaoLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KAKAO_CLIENT,
    redirect_uri: `http://localhost:4000/users/kakao/finish`,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};
export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT,
    redirect_uri: "http://localhost:4000/users/kakao/finish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  //토큰 response
  const tokenResponse = await (
    await fetch(finalUrl, {
      method: "POST",
    })
  ).json();

  if ("access_token" in tokenResponse) {
    const apiUrl = "https://kapi.kakao.com";
    const { access_token } = tokenResponse;

    const userToken = await (
      await fetch(`${apiUrl}/v1/user/access_token_info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    if (userToken.msg === "no authentication key!") {
      console.log(userToken.msg);
      return res.redirect("/");
    }

    const userData = await (
      await fetch(`${apiUrl}/v2/user/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          target_id_type: "user_id",
          target_id: userToken.id,
          Accept: "application/json",
        },
      })
    ).json();

    //카카오 계정
    const kakaoAccount = userData.kakao_account;
    const kakaoProfile = kakaoAccount.profile;

    //카카오 이메일
    if (
      kakaoAccount.is_email_valid === false ||
      kakaoAccount.is_email_verified === false
    ) {
      console.log(
        "이메일이 인증되지 않았거나 다른 계정에 사용된 이메일입니다. 다시 확인해주세요"
      );
      return res.redirect("/");
    }

    let user = await User.findOne({ email: kakaoAccount.email });
    if (!user) {
      user = await User.create({
        name: kakaoProfile.nickname,
        username: kakaoProfile.nickname,
        email: kakaoAccount.email,
      });
    }
    req.flash("success", "로그인 성공!");
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
};

//로그아웃
export const logout = (req, res) => {
  req.flash("info", "Log out");
  req.session.destroy();
  return res.redirect("/");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "playlist",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res
      .status(404)
      .render("404", { pageTitle: "유져를 찾지 못했습니다." });
  }
};
