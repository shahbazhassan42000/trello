import {useDispatch} from 'react-redux';
import {cardToggle, deleteCard, updateCard} from "../../store/cards/cardSlice";
import {Draggable} from "react-beautiful-dnd";
import {DateTime} from "luxon";
import {useRef} from "react";

const Card = ({card}) => {
    const dueRef = useRef(null);
    const dispatch = useDispatch();

    return (
        <Draggable draggableId={card.id} index={parseInt(parseInt(card.id.substring(0, 8), 16)-parseInt('5661728913124370191fa3f8'.substring(0, 8),16).toString() + parseInt(card.id.substring(18, 24), 16).toString(), 10)}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex-col mb-[5px]  bg-[#ffffff] rounded-[3px] text-[#5e6c84] py-[6px] px-[8px] cursor-pointer hover:bg-[#f4f5f7] shadow-[0_1px_0_#091e4240]">
                    <div className="w-full flex justify-between items-center mb-1">
                        <h1 className="w-[90%]" onClick={() => dispatch(cardToggle(card.id))}>{card.title}</h1>
                        <span
                            onClick={(e) => dispatch(deleteCard(card.id))}
                            className="fa fa-close hover:text-[#172b4d]">
                        </span>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <div onMouseOver={(e) => {
                            dueRef.current.classList.remove("fa-clock");
                            if (card.checked) {
                                dueRef.current.classList.remove("fa-square");
                                dueRef.current.classList.add("fa-square-check");
                            } else {
                                dueRef.current.classList.remove("fa-square-check");
                                dueRef.current.classList.add("fa-square");
                            }
                        }}
                             onMouseOut={() => {
                                 dueRef.current.classList.remove("fa-square-check");
                                 dueRef.current.classList.remove("fa-square");
                                 dueRef.current.classList.add("fa-clock");
                             }}
                             onClick={() =>dispatch(updateCard({...card, "checked": !card.checked}))}
                             className={`${card.status} !text-[16px] !m-0 !rounded-[3px]`}>
                            <span ref={dueRef} className="fa-regular fa-clock mr-2"></span>
                            {DateTime.fromFormat(card.dueDate, "dd/LL/yyyy").toLocaleString({
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                        {card.description !== "" && <span onClick={() => dispatch(cardToggle(card.id))}
                                                          className="fa-solid fa-bars-staggered"></span>}
                    </div>
                </div>
            )}
        </Draggable>
    )
};
export default Card;
