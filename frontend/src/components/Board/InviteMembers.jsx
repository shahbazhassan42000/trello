import addMembers from "../../assets/images/addMembers.png"
import loadingMini from "../../assets/images/loadingMini.gif"
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {filter, find, forEach, map, size} from "lodash";
import UsersList from "./UsersList";
import {updateBoard} from "../../store/cards/cardSlice";

const InviteMembers = ({board,setInviteUser}) => {
    const users = useSelector(state => state.cards.users);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterUsers, setFilterUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const inputField = useRef(null);
    const dispatch = useDispatch();


    return (
        <div
            className="relative min-h-[500px] overflow-hidden justify-between flex w-[60] bg-[#f4f5f7] w-[60%] mt-[48px] mb-[80px] w-[768px] rounded-[2px]  select-none">
            <div className="py-[55px] px-[40px] flex flex-col text-[#172b4d] overflow-auto mb-4">
                <h1 className="text-[24px] font-[600]">
                    Invite your team
                </h1>
                <p className="text-[14px] ">
                    Trello makes teamwork your best work. Invite your new team members to get going!
                </p>
                <div>
                    <label className="my-[12px] text-[#5e6c84] font-[700] text-[12px]">
                        Boards members
                    </label>
                    <div className="flex flex-col">
                        <div
                            className={`${searchFocus ? 'shadow-[inset_0_0_0_2px_#0079bf]' : 'shadow-[inset_0_0_0_2px_#dfe1e6]'} mt-1 flex flex-wrap space-y-1 items-center py-[8px] hover:bg-[#ebecf0] px-[12px] rounded-[3px]`}>
                            {map(members, member => {
                                return (
                                    <div
                                        key={member._id}
                                        title={member.username}
                                        className="bg-[#091e420a] flex items-center mr-2 text-[#5e6c84] cursor-default text-[14px] py-[2px] px-[4px] rounded-[3px]">
                                        <p>{member.username}</p>
                                        <span
                                            onClick={() => removeMember(member._id, setMembers)}
                                            className="fa fa-close mt-1 ml-3 pr-[2px] hover:text-[#091e42] hover:cursor-pointer">
                                        </span>
                                    </div>
                                );
                            })}
                            <input
                                ref={inputField}
                                onChange={(e) => searchMembers(e.target, setLoading, users, setFilterUsers, board, setShow, members)}
                                onFocus={() => setSearchFocus(true)}
                                onBlur={() => setSearchFocus(false)}
                                placeholder={size(members) === 0 ? 'e.g. calrissian@cloud.ci' : ''}
                                type="text" required={true}
                                className="outline-0 bg-transparent leading-[20px] text-[14px] min-h-[36px] min-w-[40px]"
                            />
                        </div>
                        <div className="relative">
                            {(loading || size(filterUsers) !== 0) && show && <div
                                className="customShadow bg-[#fff] absolute top-1 z-10 overflow-y-visible rounded-[3px] w-full">
                                <div className="overflow-y-auto p-[7px] w-full">
                                    <div className="flex flex-col space-y-[1px]">
                                        {loading && <img className="mx-auto w-[30px]" src={loadingMini} alt="loading"/>}
                                        {size(filterUsers) !== 0 &&
                                            <UsersList users={filterUsers} setMembers={setMembers}
                                                       inputField={inputField} setShow={setShow}/>}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <button
                    disabled={size(members) === 0}
                    onClick={() => {
                        const memberIDs = [...board.members];
                        forEach(members, member => memberIDs.push(member._id));
                        dispatch(updateBoard({...board, "members": memberIDs}))
                        window.location.reload();
                    }}
                    className="disabled:cursor-not-allowed disabled:bg-[#091e420a] disabled:text-[#a5adba] mt-28 h-[48px] bg-[#0079bf] hover:bg-[#026aa7] text-white rounded-[3px] py-[6px] px-[12px] leading-[20px]">
                    Invite to Board
                </button>

            </div>
            <span
                onClick={() => setInviteUser(false)}
                className="absolute right-1 top-3 fa fa-close text-2xl hover:text-[#172b4d] hover:bg-[#091e4214] px-3 py-2 rounded-[50%]">
                </span>
            <img className="w-[50%]" src={addMembers} alt="addMembers"/>
        </div>
    );
}

export default InviteMembers;

const searchMembers = (input, setLoading, users, setFilterUsers, board, setShow, members) => {
    const text = input.value;
    if (!text) {
        setFilterUsers([]);
        return;
    }
    console.log(board.members)
    const re = new RegExp(text, 'gi');
    setLoading(true);
    const filtered = [];
    forEach(users, user => {
        if (user.username.match(re) || user.email.match(re)) {
            let filteredUser = {...user};
            if (user._id === board.creator || find(board.members, (member) => member === user._id)) filteredUser.status = "Joined";
            else filteredUser.status = "";
            if (find(members, (member) => member._id === user._id)) filteredUser.status = "selected";
            if (find(board.members, (member) => member._id === user._id)) filteredUser.status = "selected";
            filtered.push(filteredUser);
            setShow(true);
        }
    })
    setFilterUsers(filtered);
    setLoading(false);
}
const removeMember = (memberID, setMembers) => {
    setMembers(members => {
        return filter(members, (member) => member._id !== memberID);
    })
}
