
import Modal from "../../UI/MyProducts/Modal";
import { useRef } from "react"
import OptionSection from "./OptionSection"
import OptionsName from "./OptionsName";
import OptionsPassword from "./OptionsPassword";
import OptionsPicture from "./OptionsPicture";
import OptionsSocials from "./OptionsSocials";

import {ShieldUser , Fingerprint , Instagram , UserPen} from 'lucide-react'

export default function Options () {
    const nameRef = useRef() ;
    const passwordRef = useRef() ;
    const socialsRef = useRef() ;
    const pictureRef = useRef() ;

    return <div className="flex flex-col gap-4 items-center">
        <Modal ref={nameRef} >
            <OptionsName ref={nameRef} />
        </Modal>
        <Modal ref={passwordRef} >
            <OptionsPassword ref={passwordRef} />
        </Modal>
        <Modal ref={pictureRef} >
            <OptionsPicture ref={pictureRef} />
        </Modal>
        <Modal ref={socialsRef} >
            <OptionsSocials ref={socialsRef} />
        </Modal>
        <OptionSection modalRef={nameRef} icon={Fingerprint} text='Change my name'  />
        <OptionSection modalRef={passwordRef} icon={ShieldUser} text='Change my password' />
        <OptionSection modalRef={socialsRef} icon={Instagram} text='Add Socials' />
        <OptionSection modalRef={pictureRef} icon={UserPen} text='Profile picture' />
    </div>
}