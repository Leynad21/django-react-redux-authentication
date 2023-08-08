import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { resetPasswordConfirm } from '../features/auth/authSlice'
import { AiFillLock } from 'react-icons/ai'
import Spinner from '../components/Spinner'

const ResetPasswordPageConfirm = () => {

    const { uid, token } = useParams()
    const [formData, setFormData] = useState({
        'new_password': '',
        're_new_password': ''
    })

    const { new_password, re_new_password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token,
            new_password,
            re_new_password
        }

        dispatch(resetPasswordConfirm(userData))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/")
            toast.success("Your password was reset successfully.")

        }


    }, [isError, isSuccess, message, navigate, dispatch])


    return (
        <>
            <div className="container auth__container">
                <h1 className="main__title">Reset Password here <AiFillLock /></h1>

                {isLoading && <Spinner />}

                <form className="auth__form">
                    <input type="password"
                        placeholder="New password"
                        name="new_password"
                        onChange={handleChange}
                        value={new_password}
                        required
                    />
                    <input type="password"
                        placeholder="Confirm new password"
                        name="re_new_password"
                        onChange={handleChange}
                        value={re_new_password}
                        required
                    />
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default ResetPasswordPageConfirm