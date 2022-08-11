import boardPrev from "../../assets/images/board-preview-skeleton.svg"
import {useRef, useState} from "react";
import axios from "axios";
import * as actions from "../../store/actions";
import {headers, loadBoards, loadingToggle} from "../../store/cards/cardSlice";
import {user} from "../../App";
import {useDispatch} from "react-redux";

const CreateBoard = ({setCreateBoard}) => {
    const boardPrevRef = useRef(null);
    const [title, setTitle] = useState(false);
    const dispatch=useDispatch();
    return (
        <div
            className="ml-11 z-30 bg-[#fff] flex flex-col absolute -top-5 left-[204px] p-4 w-[304px] rounded-[3px] shadow-[0_8px_16px_-4px_#091e4240]">
            <div className="flex justify-between items-center border-b border-b-[#091e4221]">
                <div className="w-full mb-2">
                    <p className="text-center text-[#5e6c84]">Create board</p>
                </div>
                <span
                    onClick={() => setCreateBoard(false)}
                    className="fa fa-close hover:text-[#172b4d]">
              </span>
            </div>
            <div className="flex justify-center p-[8px]">
                <div ref={boardPrevRef}
                     style={{background:'#0079bf'}}
                     className="flex items-center justify-center w-[200px] h-[120px] rounded-[3px] shadow-[0_7px_15px_#00000026]">
                    <img src={boardPrev} alt="board-preview-skeleton"/>
                </div>
            </div>
            <div className="mt-[12px]">
                <div>
                    <label className="text-[12px] leading-[16px] font-[700] text-[#5e6c84]">Background</label>
                    <div>
                        <ul className="flex justify-between">
                            <li className="bg-[#0079bf] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#0079bf"
                                    className="hover:bg-[#00000026] bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa fa-check">
                                </button>
                            </li>
                            <li className="bg-[#d29034] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#d29034"
                                    className="hover:bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa">
                                </button>
                            </li>
                            <li className="bg-[#519839] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#519839"
                                    className="hover:bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa">
                                </button>
                            </li>
                            <li className="bg-[#b04632] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#b04632"
                                    className="hover:bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa">
                                </button>
                            </li>
                            <li className="bg-[#89609e] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#89609e"
                                    className="hover:bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa">
                                </button>
                            </li>
                            <li className="bg-[#00e571] w-[40px] h-[32px] rounded-[3px]">
                                <button
                                    onClick={(e) => changeBoardPrevBg(e.target, boardPrevRef.current)}
                                    title="#00e571"
                                    className="hover:bg-[#00000026] flex items-center justify-center w-full h-full rounded-[3px] text-[#FFFFFF] text-[12px] fa">
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <form
                    onSubmit={(e) => handleFormSubmission(e, boardPrevRef.current, setCreateBoard,dispatch)}
                    className="mt-[12px] flex flex-col">
                    <label className="text-[12px] leading-[16px] font-[700] text-[#5e6c84]">
                        Board title
                        <span className="ml-[2px] text-[#eb5a46]">*</span>
                    </label>
                    <input type="text"
                           name="boardTitle"
                           onChange={(e) => e.target.value ? setTitle(true) : setTitle(false)}
                           className={`hover:bg-[#ebecf0] shadow-[inset_0_0_0_2px_#${title ? 'dfe1e6' : 'eb5a46'}] focus:bg-white focus:shadow-[inset_0_0_0_2px_#0079bf] hover:!shadow-[inset_0_0_0_2px_#${title ? '0079bf' : 'eb5a46'}] text-[14px] leading-[20px] rounded-[3px] py-[8px] px-[12px] mt-[2px] outline-0`}
                           autoFocus={true} required={true}
                    />
                    {!title && <div className="text-[14px] mt-1">
                        👋&nbsp;Board title is required
                    </div>}
                    <button
                        disabled={!title}
                        className="mt-4 w-full bg-[#0079bf] disabled:cursor-not-allowed disabled:bg-[#091e420a] text-[14px] text-white disabled:text-[#a5adba] rounded-[3px] py-[6px] px-[12px] hover:bg-[#026aa7]">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateBoard;

const changeBoardPrevBg = (btn, boardPrevRef) => {
    const ul = btn.parentElement.parentElement;
    const target = ul.querySelector('.fa-check');
    if (target) {
        target.classList.remove('fa-check');
        target.classList.remove('bg-[#00000026]');
    }
    boardPrevRef.style.backgroundColor = btn.title;
    btn.classList.add("fa-check");
    btn.classList.add('bg-[#00000026]');
}
const handleFormSubmission = (e, bgRef, setCreateBoard,dispatch) => {
    dispatch(loadingToggle());
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get('boardTitle');
    const bg = bgRef.style.backgroundColor;
    axios.request({
        baseURL: 'http://localhost:8080/api',
        url:'/board',
        method:'post',
        headers,
        data:{board:{title,bg,creator:user.id}}
    }).then((response) => {
        console.log(response);
        dispatch(loadBoards(user));
    }).catch((err) => {
        console.log(err.message);
    });
    setCreateBoard(false);
}
