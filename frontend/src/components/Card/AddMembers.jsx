import {updateCard} from "../../store/cards/cardSlice";
import {filter, map, size} from "lodash";
import {useDispatch} from "react-redux";

const AddMembers=({card,setAddMembers,boardMembers})=>{
    const dispatch=useDispatch();

    return (
        <div
            className="customShadow absolute -left-11 ml-11 z-20 bg-[#fff] flex flex-col space-y-3 p-4 w-[304px] rounded-[3px]">
            <div className="flex justify-between items-center border-b border-b-[#091e4221]">
                <div className="w-full mb-2">
                    <p className="text-center text-[#5e6c84]">Members</p>
                </div>
                <span
                    onClick={() => {
                        setAddMembers(false)
                    }}
                    className="fa fa-close hover:text-[#172b4d]">
              </span>
            </div>
            <div className="">
                <p className="text-[12px] text-[#5e6c84] font-[600] leading-[16px]">Board members</p>
                <div className="flex flex-col mt-[8px] space-y-[4px]">
                    {map(boardMembers,member=>{
                       return (
                           <button
                               title={member.username}
                               key={member._id}
                               onClick={() => toggleCardUser(member,card,dispatch)}
                               className="hover:bg-[#e4f0f6] cursor-pointer  flex space-x-3 items-center px-[4px] py-[1px] rounded-[3px]">
                               <div className="relative flex justify-center items-center py-[1px] w-[35px]">
                                   <img
                                       src={member.image} alt="profile picture"/>
                               </div>
                               <div className="flex items-start">
                                   <p className="text-[#5e6c84] text-[14px]">{member.username}</p>
                                   {size(filter(card.assignees,assignee=>assignee===member._id))!==0 &&
                                       <span className="fa fa-check mt-[6px] ml-1 text-[12px] text-[#42526e]"></span>}
                               </div>
                           </button>
                       );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AddMembers;

const toggleCardUser=(user,card,dispatch)=>{
   if(size(filter(card.assignees,assignee=>assignee===user._id))===0){
        //not in list
      dispatch(updateCard({...card,"assignees":[...card.assignees,user._id]}));
   }
   else{
       //already in list
       dispatch(updateCard({...card,"assignees":filter(card.assignees,(assignee)=>assignee!==user._id)}));
   }
}
