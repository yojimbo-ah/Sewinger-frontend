

export default function TextArea ({
        cols , rows , handleChange , value , showError ,
        onFocus , onBlur , name , id , disable , isValid , tag
    }) {

       let CLassName = `mt-4 border-2  border-b-black outline-none pl-2
        focus:bg-orange-100 focus:border-x-orange-500 focus:border-t-orange-500 transition-colors duration-200 shadow-md
       `
       if (showError) {
            CLassName += 'border-x-red-700 bg-red-100 border-t-red-700'
       } else if (isValid) {
            CLassName += 'border-x-green-600 border-t-green-600 bg-green-200'
       } else {
            CLassName += ' border-t-orange-500 border-x-orange-500 shadow-lg  bg-gray-50'
       }
        
    return <p className="ml-8">
        <label className=" mb-2 font-medium">
            {tag}
        </label>
        <br />
        <textarea value={value} onChange={handleChange} cols={cols} rows={rows} name={name} id={id}
        className={CLassName}
        onFocus={() => onFocus(name)} onBlur={() => onBlur(name)}
        />
    </p>
}