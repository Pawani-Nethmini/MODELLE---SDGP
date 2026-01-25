import profileImg from "../assets/profile.png";

export default function ProfileIcon() {
  return (
    <div className="profile-icon">
      <img
        src={profileImg}
        alt="Profile"
        className="profile-img"
      />
    </div>
  );
}
