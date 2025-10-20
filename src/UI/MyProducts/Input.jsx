

export default function Input ({
    onBlur , onFocus , name , id , focus , value , type , onChange , showError , isValid , tag

    }) {
       let CLassName = `w-2/3 pl-2 border-2 h-9 border-b-black outline-none transition-colors duration-200 shadow-md focus:bg-orange-100 ` 

       if (showError) {
            CLassName += 'border-x-red-700 bg-red-100 border-t-red-700'
       } else if (isValid) {
            CLassName += 'border-x-green-600 border-t-green-600 bg-green-200'
       } else {
            CLassName += ' border-t-orange-500 border-x-orange-500 shadow-lg  bg-gray-50'
       }
    return <>
        <div className="w-1/3 gap-2">
            <label className="block mb-2 font-medium" >
                {tag}
            </label>
            <input 
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                className={CLassName}
            />
        </div>
    </>
}