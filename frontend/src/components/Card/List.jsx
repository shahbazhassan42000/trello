import Card from "./Card";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {map} from 'lodash'
import {Droppable} from "react-beautiful-dnd";
import {addCard, loadingToggle} from "../../store/cards/cardSlice";
import {user} from "../../App";

const List = ({listTitle}) => {
    const cards = useSelector(state => state.cards.cards);
    const dispatch = useDispatch();
    const [showCard, setShowCard] = useState(false);
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }
    return (
        <Droppable droppableId={listTitle}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}
                     className="w-[272px] h-fit flex flex-col bg-[#EBECF0] rounded-[3px] py-[2px] px-[8px] mt-10 pb-[5px] select-none">
                    <h1 className="font-bold text-[#172b4d] py-[4px] px-[8px]">
                        {listTitle}
                    </h1>
                    {map(cards, (card, index) => {
                        if (card.list === listTitle) {
                            const id=parseInt(parseInt(card.id.substring(0, 8), 16)-parseInt('5661728913124370191fa3f8'.substring(0, 8),16).toString() + parseInt(card.id.substring(18, 24), 16).toString(), 10);
                            return <Card key={id} card={card}/>
                        }
                    })}
                    {showCard ? <div className="flex flex-col">
                <textarea required placeholder="Enter a title for this card..."
                          className="cardLabel px-[8px] overflow-hidden mb-[8px] max-h-[162px] min-h-[54px] p-0 outline-0 text-[14px] shadow-[0_1px_0_#091e4240] rounded-[3px]">
                </textarea>
                        <div className="flex items-center space-x-4">
                            <button onClick={(e) => {
                                const cardLabel = document.querySelector(".cardLabel").value;
                                if (cardLabel.trim().length === 0) return;
                                dispatch(loadingToggle());
                                dispatch(addCard({
                                    card: {
                                        assigner: user.id,
                                        title: cardLabel,
                                        list: listTitle
                                    }
                                }));
                                dispatch(loadingToggle());
                                setShowCard(false);
                            }} className="bg-[#0079bf] text-white rounded-[3px] py-[6px] px-[12px] hover:bg-[#026aa7]">
                                Add card
                            </button>
                            <span onClick={(e) => setShowCard(false)}
                                  className="fa fa-close text-[#6b778c] text-2xl hover:text-[#172b4d]"> </span>

                        </div>
                    </div> : <button onClick={(e) => setShowCard(true)}
                                     className="flex rounded-[3px] text-[#5e6c84] py-[4px] px-[8px] cursor-pointer hover:bg-[#091e4214]">
                        <span className="fa-solid fa-plus mt-1 mr-1"></span>Add a card
                    </button>}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export const dateToStr = (today) => {
    return ('00' + (today.getDate())).slice(-2) + '/' + ('00' + (today.getMonth() + 1)).slice(-2) + '/' + today.getFullYear();
}

export default List;
