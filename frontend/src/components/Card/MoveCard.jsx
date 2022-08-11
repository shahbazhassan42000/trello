import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateCard} from "../../store/cards/cardSlice";

const MoveCard = ({card, setMoveCard}) => {
    const [list, setList] = useState(card.list);
    const dispatch = useDispatch();
    return (
        <div
            className="ml-11 z-20 bg-[#fff] flex flex-col space-y-3 absolute p-4 w-[304px] rounded-[3px] shadow-[0_8px_16px_-4px_#091e4240]">
            <div className="flex justify-between items-center border-b border-b-[#091e4221]">
                <div className="w-full mb-2">
                    <p className="text-center text-[#5e6c84]">Move Card</p>
                </div>
                <span
                    onClick={() => {
                        setMoveCard(false)
                    }}
                    className="fa fa-close hover:text-[#172b4d]">
              </span>
            </div>
            <div className="bg-[#091e420a] rounded-[3px]">
                <p className="text-[12px]">List</p>
                <select
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                    className="border-none cursor-pointer">
                    <option value="To Do">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <button
                onClick={() => {
                    dispatch(updateCard({...card, list}));
                    setMoveCard(false);
                }}
                className="w-fit bg-[#0079bf] text-white rounded-[3px] py-[6px] px-[12px] hover:bg-[#026aa7]">
                Move
            </button>
        </div>
    )
};
export default MoveCard;
