import {useLocation} from "react-router-dom";
import logo from "../../assets/images/header-logo-spirit.d947df93bc055849898e.gif";
import {user} from "../../App";
import Profile from "../Card/Profile";
import {useEffect, useState} from "react";
import InviteMembers from "./InviteMembers";
import {loadUsers, updateBoard} from "../../store/cards/cardSlice";
import {useDispatch, useSelector} from "react-redux";
import {filter, find, forEach, map} from "lodash";


const Members = () => {
    const boards = useSelector(state => state.cards.boards);
    const users = useSelector(state => state.cards.users);
    const boardID = new URLSearchParams(useLocation().search).get('id');
    const [inviteUser, setInviteUser] = useState(false);
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch();
    const [boardMembers, setBoardMembers] = useState([]);
    const [boardCreator, setBoardCreator] = useState(null);
    const [board, setBoard] = useState(null);
    useEffect(() => {
        boards.forEach(brd => {
            if (brd._id === boardID) {
                setBoard(brd);
            }
        })
    }, [boards])
    useEffect(() => {
        if (board) {
            const bm = [];
            for (let u of users) {
                if (board.creator === u._id)
                    setBoardCreator(u);
                else if (find(board.members, (member) => member === u._id)) bm.push(u);
            }
            setBoardMembers(bm);
        }
    }, [board, users])
    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    return (
        <>
            {board && <div>
                <div
                    className="z-30 flex fixed w-full max-h-[44px]  justify-between items-center bg-[#026AA7] py-[6px] px-[20px]  select-none">
                    <div
                        onClick={() => window.location.pathname = "/"}
                        title="Trello"
                        className="flex justify-center items-center py-2 w-[80px]">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="relative flex justify-center items-center py-2 w-[35px]">
                        <img
                            title={user.username}
                            onClick={() => setProfile(true)}
                            src={user.image} alt="profile picture"/>
                        {profile && <Profile setProfile={setProfile}/>}
                    </div>
                </div>
                <div className="px-[32px] select-none">
                    <div className="flex py-[32px] justify-between pt-[76px]">
                        <div className="flex space-x-6 text-[#172b4d]">
                            <div
                                onClick={()=>window.location="/b/"+board._id }
                                title={board.title}
                                style={{background: board.bg}} className="h-[60px] w-[60px] rounded-[4px]">
                                <p className="font-[900] text-5xl text-center text-white cursor-pointer">
                                    {board.title.charAt(0)}
                                </p>
                            </div>
                            <div>
                                <div className="flex">
                                    <h1 className="font-[600] relative text-[20px] leading-[24px] ">
                                        {board.title}
                                        <span
                                            className="hover:bg-[#091e4214] hover:cursor-pointer absolute top-[3px] left-6 text-[12px] p-[4px] rounded-[3px] fa fa-pen "></span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                onClick={() => setInviteUser(true)}
                                className="bg-[#0079bf] hover:bg-[#026aa7] flex items-center cursor-pointer text-white py-[6px] px-[12px] rounded-[3px] select-none">
                                <span className="fa-solid fa-user-plus mr-1 text-[12px]"></span>
                                Invite Boards Members
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="mt-6 text-[#172b4d]">
                        <h1 className="text-[18px] leading-[30px] font-[600]">{`Boards Members(${board.members.length + 1})`}</h1>
                        <p className="text-[14px] mt-2 mb-5">
                            Board members can view, move and create new cards in the Board.
                        </p>
                        <hr/>
                        <div className="flex flex-col">
                            {boardCreator &&
                                <div
                                    key={boardCreator._id}
                                    className="flex justify-between items-center px-[4px] py-[1px]  my-[0.75rem]">
                                    <div className="flex space-x-3 items-center">
                                        <div
                                            title={boardCreator.username}
                                            className="relative flex justify-center items-center py-[1px] w-[35px]">
                                            <img
                                                src={boardCreator.image} alt="profile"/>
                                            <span
                                                title="This member is an admin of this Board."
                                                className='absolute bottom-0 right-0 text-[12px] fa fa-angles-up'></span>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <p className="text-[#172b4d] font-[700]">{boardCreator.username}</p>
                                            <p className="text-[14px] text-[#5e6c84] -mt-1">{boardCreator.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-[#5e6c84]">
                                        <div className="py-[6px] px-[12px] mr-7 text-center">Admin</div>
                                        <button disabled={true}
                                            className="disabled:cursor-not-allowed text-[#A5ADBA] py-[6px] px-[12px] rounded-[3px] hover:bg-[#091e4214] cursor-pointer">
                                            <span className="fa fa-close mr-2"></span>
                                            Remove
                                        </button>
                                    </div>
                                </div>}
                            <hr/>
                            {map(boardMembers, bm => {
                                return (
                                    <div key={bm._id}>
                                        <div
                                            className="flex justify-between items-center px-[4px] py-[1px] rounded-[3px] my-[0.75rem]">
                                            <div className="flex space-x-3 items-center">
                                                <div
                                                    title={bm.username}
                                                    className="relative flex justify-center items-center py-[1px] w-[35px]">
                                                    <img
                                                        src={bm.image} alt="profile"/>
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <p className="text-[#172b4d] font-[700]">{bm.username}</p>
                                                    <p className="text-[14px] text-[#5e6c84] -mt-1">{bm.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-[#5e6c84]">
                                                <div className="py-[6px] px-[12px] mr-9 text-center">User</div>
                                                <div
                                                    onClick={() => {
                                                        removeBoard(dispatch,bm._id,boardMembers,board,setBoard);
                                                        if(user.id!==board.creator){
                                                            window.location="/";
                                                        }
                                                    }}
                                                    className="py-[6px] px-[12px] rounded-[3px] hover:bg-[#091e4214] cursor-pointer">
                                                    <span className="fa fa-close mr-2"></span>
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {inviteUser &&
                    <div
                        className="z-50 fixed top-0 left-0 flex items-start justify-center w-screen h-screen bg-[#000000a3]">
                        <InviteMembers key={board._id} board={board} setInviteUser={setInviteUser}/>
                    </div>}
            </div>}
        </>
    );

}

export default Members;

const removeBoard=(dispatch,ID,boardMembers,board,setBoard)=>{
    const memberIDs=[];
    forEach(boardMembers, (member) =>{
        if(member._id !== ID)  memberIDs.push(member._id);
    });
    const updatedBoard={...board, "members": memberIDs};
    dispatch(updateBoard(updatedBoard))
    setBoard(updatedBoard)
}
