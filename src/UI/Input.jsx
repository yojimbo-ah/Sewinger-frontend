
export default function Input ({
    name ,type , id , label
     , value , onChange , disable ,
      onFocus , onBlur , showError , isValid 
}) {
    let ClassName = "pl-2 mt-4 h-8 border-2 w-2/3 rounded focus:bg-orange-200 focus:border-orange-500 outline-none shadow-lg"
    if (showError) {
        ClassName += ' bg-red-300 border-red-700 '
    } else if (isValid) {
        ClassName += ' bg-green-200 border-green-700'
    }
    return <p className="ml-6 mt-4">
        <label  className="text-base" >
            {label}
        </label>
        <br />
        <input onBlur={() => onBlur(name)} onFocus={() => onFocus(name)} value={value} onChange={((event) => onChange(event , name))}
        type={type} name={name} id={id} disabled={disable}
        className={ClassName}/> 
    </p>
}