import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import MoveCard from "./MoveCard";
import DueDate from "./DueDate";
import {dateToStr} from "./List";
import {DateTime} from "luxon";
import {cardToggle, deleteCard, updateCard} from "../../store/cards/cardSlice";
import AddMembers from "./AddMembers";
import {includes, map, size} from "lodash";
import {user} from "../../App";

const CardDetail = ({id,boardMembers,cardMembers}) => {
    const cards = useSelector(state => state.cards.cards);
    const card = cards[id];
    const [moveCard, setMoveCard] = useState(false);
    const [moveCard2, setMoveCard2] = useState(false);
    const [showDueDate, setShowDueDate] = useState(false);
    const [showDueDate2, setShowDueDate2] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [addMembers, setAddMembers] = useState(false);
    const [addMember2, setAddMembers2] = useState(false);
    const dispatch = useDispatch();
    const displayDate = formattedDate(card.dueDate);
    return (
        <div
            className="relative flex flex-col w-[60] bg-[#f4f5f7] w-[60%] mt-[48px] mb-[80px] w-[768px] rounded-[2px] p-[16px] select-none">
            <div className="flex justify-between items-center">
                <h1 className="">
                    <span className="fas fa-tasks mr-2"></span>
                    {card.title}
                </h1>
                <span
                    onClick={() => dispatch(cardToggle())}
                    className="fa fa-close text-2xl hover:text-[#172b4d] hover:bg-[#091e4214] px-3 py-2 rounded-[50%]">
                </span>
            </div>
            <div className="-mt-2 pl-6 relative text-[#5e6c84]">in list
                <span
                    onClick={() => setMoveCard(true)}
                    className="ml-2 underline hover:text-[#172b4d] cursor-pointer">
                    {card.list}
                </span>
                {moveCard && <>
                    <div className="fixed w-screen h-screen top-0 left-0 z-10"></div>
                    <MoveCard card={card} setMoveCard={setMoveCard}/>
                </>}
            </div>
            <div className="flex space-x-4">
                <div className="w-[552px] relative">
                    {size(cardMembers)!==0 &&
                        <div className="mt-6 ml-6">
                            <h1 className="text-[#5e6c84] text-[12px] font-[600] mb-1">Members</h1>
                            <div className="flex space-x-1">
                                {map(cardMembers,member=>{
                                    return (
                                        <div
                                            key={member._id}
                                            title={member.username}
                                            className="relative flex justify-center items-center py-[1px] w-[35px]">
                                            <img
                                                src={member.image} alt="profile"/>
                                        </div>
                                    );
                                })}
                                <div>
                                    <button
                                        disabled={card.assigner!==user.id}
                                        onClick={()=>setAddMembers2(true)}
                                        className="disabled:cursor-not-allowed disabled:text-[#a5adba] text-[#42526e] hover:bg-[#091e4214] relative flex justify-center items-center py-[1px] h-full rounded-[100%] w-[35px] bg-[#091e420a]">
                                        <span className="fa fa-add"></span>
                                    </button>
                                    <div className="relative">
                                        {addMember2 && <AddMembers card={card} setAddMembers={setAddMembers2} boardMembers={boardMembers} />}
                                    </div>
                                </div>
                            </div>
                        </div>}

                    <div className="mt-6 ml-6">
                        <p>Due Date</p>
                        <div className="flex items-center">
                            <input className="" type="checkbox" checked={card.checked}
                                   onChange={() => dispatch(updateCard({...card, "checked": !card.checked}))}
                            />
                            <div onClick={() => setShowDueDate(true)}
                                 className="flex items-center ml-1 py-[6px] px-[12px] rounded-[3px] bg-[#091e420a] hover:bg-[#091e4214]">
                                <p>{displayDate}</p>
                                {<p className={card.status}>{card.status}</p>}
                                <span className="ml-1 fa-solid fa-angle-down"></span>
                            </div>
                        </div>
                    </div>
                    {showDueDate && <>
                        <div className="fixed w-screen h-screen top-0 left-0 z-10"></div>
                        <DueDate card={card} setShowDueDate={setShowDueDate}/>
                    </>}
                    <div className="mt-6">
                        <span className="fa-solid fa-bars-staggered mr-2"></span>
                        Description
                        {(card.description !== "" && !showDescription) && <button
                            onClick={(e) => setShowDescription(true)}
                            className="ml-2 bg-[#091e420a] text-[#172b4d] text-[14px] rounded-[3px] py-[6px] px-[12px] hover:bg-[#091e4214]">
                            Edit
                        </button>}
                    </div>
                    {showDescription ? <div className="flex flex-col">
                    <textarea required defaultValue={card.description} placeholder="Add a more detailed description..."
                              className="mt-3 ml-6 description py-[12px] px-[12px] mb-[8px]  min-h-[108px] outline-0 text-[14px] shadow-[inset_0_0_0_2px_#0079bf] rounded-[3px]">

                    </textarea>
                        <div className="ml-6 flex items-center space-x-2">
                            <button
                                onClick={(e) => {
                                    const description = document.querySelector(".description").value;
                                    if (description.trim().length === 0) {
                                        dispatch(updateCard({...card, "description": description.trim()}));
                                        setShowDescription(false);
                                        return;
                                    }
                                    dispatch(updateCard({...card, description}));
                                    setShowDescription(false);
                                }}
                                className="bg-[#0079bf] text-white rounded-[3px] py-[6px] px-[12px] hover:bg-[#026aa7]">
                                Save
                            </button>
                            <button
                                onClick={(e) => setShowDescription(false)}
                                className="bg-none text-[#172b4d] rounded-[3px] py-[6px] px-[12px] hover:bg-[#091e4214]">
                                Cancel
                            </button>
                        </div>
                    </div> : card.description === "" ? <div
                        onClick={() => setShowDescription(true)}
                        className="mt-6 ml-6 py-[8px] px-[12px] pb-[35px] rounded-[3px] bg-[#091e420a] hover:bg-[#091e4214] cursor-pointer">Add
                        a more detailed description...
                    </div> : <div
                        onClick={() => setShowDescription(true)}
                        className="mt-3 ml-6 cursor-pointer">
                        {card.description}
                    </div>
                    }

                </div>
                <div className="mt-[17px] flex flex-col space-y-[8px] w-[216px] relative">
                    <h1 className="text-[#5e6c84] text-[12px] font-bold">Add to card</h1>
                    <button
                        disabled={card.assigner!==user.id}
                        onClick={()=>setAddMembers(true)}
                        className="disabled:cursor-not-allowed disabled:text-[#a5adba] hover:bg-[#091e4214] bg-[#091e420a] text-[14px] text-left text-[#172b4d] py-[6px] px-[12px] rounded-[3px] flex items-center">
                        <span className="fa-regular fa-user text-[11px] mr-2"></span>
                        Members
                    </button>
                    <div className="relative">
                        {addMembers && <AddMembers card={card} setAddMembers={setAddMembers} boardMembers={boardMembers} />}
                    </div>
                    <button
                        onClick={() => setShowDueDate2(true)}
                        className="bg-[#091e420a] hover:bg-[#091e4214] text-[14px] text-left text-[#172b4d] py-[6px] px-[12px] rounded-[3px] flex items-center">
                        <span className="fa-regular fa-clock text-[11px] mr-2"></span>
                        Dates
                    </button>
                    <h1 className="text-[#5e6c84] text-[12px] font-bold">Actions</h1>
                    <button
                        onClick={() => setMoveCard2(true)}
                        className="bg-[#091e420a] hover:bg-[#091e4214] text-[14px] text-left text-[#172b4d] py-[6px] px-[12px] rounded-[3px] flex items-center">
                        <span className="fa-solid fa-arrow-right text-[11px] mr-2"></span>
                        Move
                    </button>
                    <span className="relative">
                            {moveCard2 && <>
                                <div className="fixed w-screen h-screen top-0 left-0 z-10"></div>
                                <MoveCard card={card} setMoveCard={setMoveCard2}/>
                            </>}
                    </span>
                    <button
                        disabled={card.assigner!==user.id}
                        onClick={(e) => {
                            dispatch(cardToggle());
                            dispatch(deleteCard(card.id));
                        }}
                        className="disabled:cursor-not-allowed disabled:text-[#a5adba] bg-[#091e420a] hover:bg-[#091e4214] text-[14px] text-left text-[#172b4d] py-[6px] px-[12px] rounded-[3px] flex items-center">
                        <span className="fa-regular fa-trash-can text-[11px] mr-2"></span>
                        Delete
                    </button>
                    {showDueDate2 && <>
                        <div className="fixed w-screen h-screen top-0 left-0 z-10"></div>
                        <DueDate card={card} setShowDueDate={setShowDueDate2}/>
                    </>}
                </div>
            </div>
        </div>
    );
}

export const formattedDate = (dueDateStr) => {
    const currentDate = new Date();
    if (dateToStr(currentDate) === dueDateStr) return "today";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateToStr(tomorrow) === dueDateStr) return "tomorrow";
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateToStr(yesterday) === dueDateStr) return "yesterday";
    return DateTime.fromFormat(dueDateStr, "dd/LL/yyyy").toLocaleString({month: 'short', day: 'numeric'});
}

export default CardDetail;
