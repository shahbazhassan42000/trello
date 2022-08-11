const Profile = ({setProfile}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div
            className="absolute top-14 -right-4 bg-[#fff] flex flex-col space-y-3 absolute py-4 w-[304px] rounded-[3px] shadow-[0_8px_16px_-4px_#091e4240]">
            <div className="flex justify-between items-center mx-4 border-b border-b-[#091e4221]">
                <div className="w-full mb-2">
                    <p className="text-center text-[14px] text-[#5e6c84]">Account</p>
                </div>
                <span
                    onClick={() => setProfile(false)}
                    className="fa fa-close text-[14px] text-[#5e6c84] hover:text-[#172b4d]">
              </span>
            </div>
            <div className="flex space-x-3 items-center mx-4 border-b border-b-[#091e4221] pb-3">
                <div className="relative flex justify-center items-center py-2 w-[35px]">
                    <img title={user.username} src={user.image} alt="profile picture"/>
                </div>
                <div className="flex flex-col">
                    <p className="text-[#172b4d] text-[14px]">{user.username}</p>
                    <p className="text-[12px] text-[#B3BAC5]">{user.email}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-2 mx-4 border-b border-b-[#091e4221] pb-3">
                <button className="text-[#172b4d] -mx-4 px-4  text-[14px] text-start py-1 hover:bg-[#091e420a]">
                    Profile Setting
                </button>
            </div>
            <div className="flex flex-col space-y-2x">
                <button onClick={() => window.location.pathname = "/logout"}
                        className="text-[#172b4d]  px-4  text-[14px] text-start py-1 hover:bg-[#091e420a]">
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Profile;

