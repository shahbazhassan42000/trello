import {useSelector} from "react-redux";
import logo from "../assets/images/header-logo-spirit.d947df93bc055849898e.gif"
import {useState} from "react";
import Profile from "./Card/Profile";
import CreateBoard from "./Board/CreateBoard";
import {map} from "lodash";
import Loading from "./Loading";


const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const boards = useSelector(state => state.cards.boards);
    const loading = useSelector(state => state.cards.loading);
    const [profile, setProfile] = useState(false);
    const [createBoard, setCreateBoard] = useState(false);
    return (
        <>
            <div
                className="z-30 flex fixed w-full max-h-[44px]  justify-between items-center bg-[#026AA7] py-[6px] px-[20px]  select-none">
                <div
                    onClick={()=>window.location.pathname="/"}
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
            <div className="pt-[74px] flex flex-wrap p-[32px] pr-[4px] relative">
                <div className="flex relative">
                    <div
                        onClick={() => setCreateBoard(true)}
                        className="bg-[#091e420a] w-[240px] mb-[26px] mr-[26px] hover:bg-[#091e4214] rounded-[3px] h-[94px] p-[8px] flex items-center justify-center cursor-pointer">
                        <h1 className="text-[#172b4d]">Create new board</h1>
                    </div>
                    {createBoard && <CreateBoard setCreateBoard={setCreateBoard}/>}
                </div>
                {map(boards, (board, index) => {
                    return (
                        <div
                            key={board._id}
                            className="flex relative">
                            <a href={"/b/" + board._id}>
                                <div
                                    style={{background: board.bg}}
                                    className="w-[240px] mb-[26px] mr-[26px] hover:brightness-90 rounded-[3px] h-[94px] p-[8px] flex items-center justify-center cursor-pointer">
                                    <h1 className="text-white select-none">{board.title}</h1>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
            {loading && <Loading/>}
        </>
    );
};


export default Home;
