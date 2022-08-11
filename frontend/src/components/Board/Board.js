import logo from "../../assets/images/header-logo-spirit.d947df93bc055849898e.gif";
import Profile from "../Card/Profile";
import {useEffect, useState} from "react";
import {user} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import CardDetail from "../Card/CardDetail";
import {deleteBoard, loadCards, loadUsers, updateCard} from "../../store/cards/cardSlice";
import {DragDropContext} from "react-beautiful-dnd";
import List from "../Card/List";
import {Link} from "react-router-dom";
import {filter, find, includes, map} from "lodash";
import Loading from "../Loading";

const Board = () => {
    const users = useSelector(state => state.cards.users);
    const loading = useSelector(state => state.cards.loading);
    const boards = useSelector(state => state.cards.boards);
    const cards = useSelector(state => state.cards.cards);
    const cardDetails = useSelector(state => state.cards.card);
    const [profile, setProfile] = useState(false);
    const boardID = window.location.pathname.substring(3);
    const [boardMembers, setBoardMembers] = useState([]);
    const [boardCreator, setBoardCreator] = useState(null);
    const [board, setBoard] = useState(null);
    useEffect(() => {
        boards.forEach(brd => {
            if (brd._id === boardID) setBoard(brd);
        })
    }, [boards])
    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadCards(user.id));
    }, []);
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
    const isAdmin = board && user.id === board.creator;
    const dispatch = useDispatch();
    const onDragEnd = (result) => {
        console.log("dragged")
        if (!result.destination) {
            return;
        }
        dispatch(updateCard({...cards[result.draggableId], "list": result.destination.droppableId}))
        const sourceID = result.source.index;
        const destinationID = result.destination.index;
        console.log("SOURCE ID: ", sourceID);
        console.log("DESTINATION ID: ", destinationID);
    }
    return (
        <>
            {board && <div>
                <div
                    className="z-30 flex fixed w-full max-h-[44px]  justify-between items-center !bg-[#00000029] py-[6px] px-[20px]  select-none">
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
                            src={user.image} alt="profile"/>
                        {profile && <Profile setProfile={setProfile}/>}
                    </div>
                </div>
                <div
                    style={{background: board.bg}}
                    className="h-screen w-screen pt-[44px] relative select-none">
                    <div className="flex justify-between py-2 px-[20px] -mb-10">
                        <div className="flex">
                            <h1 className="text-[18px] text-white font-[900] py-1 px-3 rounded-[3px] select-none">
                                {board.title}
                            </h1>
                            <span className="border border-[#ffffff3d] my-[8px] mx-[12px]"></span>
                            <div
                                key={board._id}
                                className="bg-[#ffffff3d] hover:bg-[#ffffff52] cursor-pointer text-white py-1 px-3 rounded-[3px] select-none">
                                <span className="fa-solid fa-users mr-2"></span>
                                <Link
                                    to={`${window.location.pathname}/members/?id=${board._id}`}>Members</Link>
                            </div>
                            <span className="border border-[#ffffff3d] my-[8px] mx-[12px]"></span>
                            <div className="flex">
                                {boardCreator &&
                                    <div
                                        title={boardCreator.username}
                                        className="z-[991] relative flex justify-center items-center py-[1px] w-[35px]">
                                        <img
                                            src={boardCreator.image} alt="profile"/>
                                        <span
                                            title="This member is an admin of this Board."
                                            className='absolute bottom-0 right-0 text-[12px] fa fa-angles-up'></span>
                                    </div>}
                                {map(boardMembers, (bm, index) => {
                                    return (
                                        <div
                                            title={bm.username}
                                            key={bm._id}
                                            className={`z-[${990 - index}] -ml-[3px] relative flex justify-center items-center py-[1px] w-[35px]`}>
                                            <img
                                                src={bm.image} alt="profile"/>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {isAdmin && <div
                            onClick={() => {
                                dispatch(deleteBoard(board));
                                window.location.pathname = "/";
                            }}
                            className="justify-self-end bg-[#ffffff3d] hover:bg-[#ffffff52] cursor-pointer text-white py-1 px-3 rounded-[3px] select-none">
                            <span className="fa fa-trash-can mr-2"></span>
                            Delete Board
                        </div>}
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex justify-evenly">
                            <List listTitle="To Do"/>
                            <List listTitle="Doing"/>
                            <List listTitle="Done"/>
                            <List listTitle="Completed"/>
                        </div>
                    </DragDropContext>
                    {cardDetails.show && <>
                        <div
                            className="z-[999] fixed top-0 left-0 flex items-start justify-center w-screen h-screen bg-[#000000a3]">
                            <CardDetail id={cardDetails.id} boardMembers={[...boardMembers, boardCreator]}
                                        cardMembers={filter([...boardMembers, boardCreator], member => {
                                            if (includes(cards[cardDetails.id].assignees, member._id)) {
                                                return member;
                                            }
                                        })}/>
                        </div>
                    </>}
                </div>
            </div>}
            {loading && <Loading/>}
        </>
    );
}

export default Board;
