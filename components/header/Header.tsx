import HeaderLeft from "@/components/header/left-side";
import HeaderRight from "@/components/header/right-side";

export default function Header() {
    return (
        <div className='mx-3 flex items-center justify-between py-4'>
            <HeaderLeft/>
            <HeaderRight/>
        </div>
    )
}
