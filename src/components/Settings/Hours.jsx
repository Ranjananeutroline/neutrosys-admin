import React, {useState} from 'react'
import hour from "../../assets/hour.svg"
import ellipse from "../../assets/ellipse.png"
import trash from "../../assets/trash.png";
import add from "../../assets/add.png";


const Hours = () => {
 
        const [selectedOption, setSelectedOption] = useState("default");
      
        const handleOptionChange = (e) => {
          setSelectedOption(e.target.value);
        };
        const [selectedFromWeek, setSelectedFromWeek] = useState("");
        const [selectedToWeek, setSelectedToWeek] = useState("");
      
        const handleSelectFrom = (event) => {
          setSelectedFromWeek(event.target.value);
        };
        const handleSelectTo = (event) => {
          setSelectedToWeek(event.target.value);
        };
      
        const [workHourOpen, setWorkHourOpen] = useState(false);
        const [breakOpen, setBreakOpen] = useState(false);
      
        const toggleWorkHour = () => {
          setWorkHourOpen(!workHourOpen);
        };
      
        const toggleBreak = () => {
          setBreakOpen(!breakOpen);
        };
   

  
  
    
      
  return (
    <div className='w-[570px] h-[450px] bg-[#FBFCFF] border rounded-[10px] shadow-sm  flex flex-col '>
        <div className='flex gap-2 items-center my-3 mx-7'>
            <img src={hour} alt='hour' className='w-[20px] h-[20px]'/>
            <h2 className='text-[21px] text-[#0C1A97] font-[400]'>Business Hours</h2>
        </div>
      
        <div className='w-full h-[1px] bg-[#e4e4e4]'> </div>
        <div className='flex items-center justify-evenly my-3 mx-7 '>
        <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="default"
            checked={selectedOption === "default"}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out "
          />
          <span className="ml-2 text-[18px] text-[#0C1A97] font-normal" style={{fontFamily:"Inter"}}>Default</span>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="custom"
            checked={selectedOption === "custom"}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out "
          />
          <span  className="ml-2 text-[18px] text-[#0C1A97] font-normal" style={{fontFamily:"Inter"}}>Custom</span>
        </label>
      </div>
        </div>
        <div className='w-full h-[1px] bg-[#e4e4e4]'> </div>
        <div className='flex items-center my-4 mx-7 justify-between'>
          <h1>Timezone</h1>
          <div className='flex items-center gap-3 px-8 border border-[#d2d2d2] bg-[#FBFCFF] py-1 rounded-[3px]'>
            <img src={ellipse} alt='ellipse'/>
            <h2 className='text-[14px]'>Central Time - US & Canada</h2></div>
        </div>
        <div className='w-full h-[1px] bg-[#e4e4e4]'> </div>
        <div className='flex items-center justify-between my-4 mx-7 '>
          <h2>Business Days</h2>
          <div className='flex gap-2 items-center' >
            <select value={selectedFromWeek} onChange={handleSelectFrom} className=' border px-2 py-1 rounded-[3px] text-[14px]'>
              <option value="">Select</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <p>to</p>
            <select value={selectedToWeek} onChange={handleSelectTo} className=' border px-2 py-1 rounded-[3px] text-[14px]'>
              <option value="">Select</option>
              
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          {/* <div className='flex gap-1'>
            <img src={add} />
            <img src={trash} />
          </div> */}

          {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
        </div>
        <div className='w-full h-[1px] bg-[#e4e4e4]'> </div>
        <div className='flex  my-4 mx-7 justify-between' >
          <h2>Days</h2>
          <div className='flex flex-col gap-3'>
            <div  className='flex gap-3'>
              <button onClick={toggleWorkHour} className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Mon</button>
              <button onClick={toggleWorkHour}  className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Tue</button>
              <button onClick={toggleWorkHour}  className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Wed</button>
              <button onClick={toggleWorkHour} className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Thu</button>
              <button onClick={toggleWorkHour} className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Fri</button>
              <button onClick={toggleWorkHour} className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Sat</button>
              <button onClick={toggleWorkHour} className='border rounded-[3px] h-[30px] w-[38px] items-center text-[12px] shadow-sm'>Sun</button>
            </div>

            <div className='px-3 py-3 border rounded-[6px] flex flex-col gap-2  bg-[#dde4f6]'>
            
              <div className='flex gap-3 items-center'>
                <h2 className='text-[14px]'>Work Hours</h2>
                <div className='flex gap-3'>
                  <select value={selectedFromWeek} onChange={handleSelectFrom} className=' border px-2 py-1 rounded-[3px] text-[12px]'>
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <p>to</p>
                  <select value={selectedToWeek} onChange={handleSelectTo} className=' border px-2 py-1 rounded-[3px] text-[12px]'>
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
              </div>

              <div className='flex justify-between'>
                <h2  className='text-[14px]'>Break</h2>
                <div className='flex gap-3' >
                  <select value={selectedFromWeek} onChange={handleSelectFrom} className=' border px-2 py-1 rounded-[3px] text-[12px]'>
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <p>to</p>
                  <select value={selectedToWeek} onChange={handleSelectTo} className=' border px-2 py-1 rounded-[3px] text-[12px]'>
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
              </div>
            </div>
          </div>
        </div>
              <div className='w-full h-[1px] bg-[#e4e4e4]'> </div>
        
      
    </div>
      
   
  )
}

export default Hours
