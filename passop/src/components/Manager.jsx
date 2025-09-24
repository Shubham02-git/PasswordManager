import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const PasswordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipBoard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {
        if (ref.current.src.includes("Icons/eyecross.png")) {
            ref.current.src = "Icons/eye.png";
            PasswordRef.current.type = "text";
        } else {
            ref.current.src = "Icons/eyecross.png";
            PasswordRef.current.type = "password";
        }
    }
    const savePassword = () => {
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" });
    }

    const deletePassword = (id) => {
        console.log("deleting password with id:", id);
        let c = confirm("Are you sure you want to delete this password?");
        if(c){
        setPasswordArray(passwordArray.filter(item => item.id !== id)); // Filter out the password with the given id
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id))); // Update localStorage
        }
    }

    const editPassword = (id) => {
    console.log("editing password with id:", id);
    setform(passwordArray.find(i => i.id === id));
    setPasswordArray(passwordArray.filter(item => item.id !== id));
}

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="mycontainer max-w-4xl mx-auto px-2 sm:px-4 md:px-8 lg:px-0">
                <h1 className='text-center text-3xl sm:text-4xl font-bold'><span className='text-green-700'>&lt;</span>
                    PassWord
                    <span className='text-green-700'>Manager/&gt;</span></h1>
                <p className='text-green-900 text-base sm:text-lg text-center'>Your Own Password Manager</p>
                <div className="flex flex-col p-2 sm:p-4 text-black gap-4 sm:gap-8 items-center w-full">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-2 sm:p-4 py-1' type="text" name="site" id="" />
                    <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full sm:w-1/2 p-2 sm:p-4 py-1' type="text" name="username" id="" />

                        <div className="relative w-full sm:w-1/2 mt-2 sm:mt-0">
                            <input ref={PasswordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-2 sm:p-4 py-1 pr-10' type="password" name="password" id="" />
                            <span className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer h-full' onClick={showPassword}>
                                <img className='p-1' ref={ref} width={26} src="/Icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full gap-2 w-fit px-4 py-1 hover:bg-green-300 border-1 border-green-900 text-base sm:text-lg'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                </div>
                <div className="passwords w-full overflow-x-auto">
                    <h2 className='font-bold text-xl sm:text-2xl py-4'>Your Passwords</h2>
                    <div className="min-h-[220px] flex flex-col justify-end">
                        {passwordArray.length == 0 && <div className='text-center'>No Passwords to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden text-xs sm:text-base">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='p-2'>Site</th>
                                <th className='p-2'>Username</th>
                                <th className='p-2'>Password</th>
                                <th className='p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center min-w-[120px]'>
                                        <div className='flex items-center justify-center flex-wrap'>
                                            <a href={item.site} target='_blank' className='break-all'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-[120px]'>
                                        <div className='flex items-center justify-center flex-wrap'>
                                            <span className='break-all'>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-[120px]'>
                                        <div className='flex items-center justify-center flex-wrap'>
                                            <span className='break-all'>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center min-w-[120px]'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
