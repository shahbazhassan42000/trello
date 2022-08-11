import {map} from "lodash";

const UsersList = ({users, setMembers, inputField, setShow}) => {
    return (
        map(users, user => {
            return (
                <button
                    title={user.username}
                    key={user._id}
                    disabled={user.status === 'Joined' || user.status === 'selected'}
                    onClick={() => addMember(user, setMembers, inputField, setShow)}
                    className="hover:bg-[#e4f0f6] disabled:bg-[#ffff] cursor-pointer disabled:cursor-not-allowed  flex space-x-3 items-center px-[4px] py-[1px] rounded-[3px]">
                    <div className="relative flex justify-center items-center py-[1px] w-[35px]">
                        <img
                            src={user.image} alt="profile picture"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-[#5e6c84] text-[14px]">{user.username}</p>
                        {user.status === 'Joined' && <p className="text-[12px] text-[#5e6c84]">{user.status}</p>}
                    </div>
                </button>
            );
        })
    );
}
export default UsersList;

const addMember = (user, setMembers, inputField, setShow) => {
    setShow(false);
    inputField.current.value = "";
    setMembers(members => [...members, user]);
}
