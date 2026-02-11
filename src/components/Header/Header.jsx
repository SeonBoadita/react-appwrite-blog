import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const authSelector = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navigateItems = [
        {
            name: "Home", path: "/", active: true
        },
        {
            name: "Login", path: "/login", active: !authSelector
        },
        {
            name: "Signup", path: "/signup", active: !authSelector
        },
        {
            name: "All-Posts", path: "/all-posts", active: authSelector
        },
        {
            name: "Create-Post", path: "/create-post", active: authSelector
        }
    ]
    return (
        <>
            <header className='w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4'>
                <h1 className='text-xl font-bold'>My App</h1>
                <nav>
                    <ul className='flex space-x-4'>
                        {navigateItems.map((item, index) => (
                            item.active && (
                                <li key={index} onClick={() => navigate(item.path)} className='cursor-pointer'>
                                    {item.name}
                                </li>
                            )
                        ))}
                    </ul>
                </nav>
                {authSelector && <LogoutBtn />}
            </header>
        </>
    )
}

export default Header
