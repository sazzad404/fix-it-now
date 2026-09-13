import { userInfo } from "@/utils/userInfo";
import React from "react";
import ProfileCard, { User } from "../../_components/ProfileCard";
import { getMyProfile } from "../../_actions/getMyProfile";

const userProfilePage = async () => {
  const result = await getMyProfile();

  if (!result.success || !result.data) {
    return <div>Unable to load profile</div>;
  }

  return <ProfileCard profile={result.data} />;
};

export default userProfilePage;
