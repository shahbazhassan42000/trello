import {useState} from "react";
import {useDispatch} from "react-redux";
import DatePicker from 'sassy-datepicker';
import {dateToStr} from "./List";
import {updateCard} from "../../store/cards/cardSlice";

const datePattern = new RegExp("^(((0?[1-9]|[12]\\d|30)\\/(0?[13-9]|1[012])|31\\/(0?[13578]|1[02])|(0?[1-9]|1\\d|2[0-8])\\/0?2)\\/(\\d{4})|(29\\/0?2\\/\\d{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048])00))$")

const DueDate = ({card, setShowDueDate}) => {
    const [dueDate, setDueDate] = useState(card.dueDate);
    const dispatch = useDispatch();

    return (
        <div
            className="ml-11 z-20 bg-[#fff] flex flex-col space-y-3 absolute p-4 w-[304px] rounded-[3px] shadow-[0_8px_16px_-4px_#091e4240]">
            <div className="flex justify-between items-center border-b border-b-[#091e4221]">
                <div className="w-full mb-2">
                    <p className="text-center text-[#5e6c84]">Dates</p>
                </div>
                <span
                    onClick={() => {
                        setShowDueDate(false)
                    }}
                    className="fa fa-close hover:text-[#172b4d]">
              </span>
            </div>
            <div className="flex-col rounded-[3px]">
                <DatePicker key={dueDate} selected={strToDate(dueDate.split('/'))}
                            onChange={(newTime) => setDueDate(dateToStr(newTime))}/>
                <div className="flex-col">
                    <p className="text-[14px] text-[#0079BF] font-bold">Due Date</p>
                    <input key={dueDate} defaultValue={dueDate} onBlur={(e) => {
                        let date = e.target.value;
                        if (datePattern.test(date)) {
                            date = dateToStr(strToDate(date.split('/')));
                            e.target.value = date;
                            setDueDate(date);
                            console.log("UPDATED DATE: ", date);
                        } else {
                            e.target.value = dueDate;
                            console.log("ERROR!!! Invalid date")
                        }

                    }}
                           className="w-[115px] p-[6px] text-center outline-none rounded-[3px] shadow-[inset_0_0_0_2px_#0079bf]"
                           placeholder="DD/MM/YYYY" type="text"/>
                </div>
            </div>
            <button
                onClick={() => {
                    dispatch(updateCard({...card, dueDate}));
                    setShowDueDate(false);
                }}
                className=" bg-[#0079bf] text-white rounded-[3px] py-[6px] px-[12px] hover:bg-[#026aa7]">
                Save
            </button>
        </div>
    )
};

export const strToDate = ([day, month, year]) => {
    return new Date(year, month - 1, day, 0, 0, 0);
}


export default DueDate;
