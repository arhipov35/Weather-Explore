import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgrnd, setColorSvg } from '../../store/colorSet';
import './SelectColor.css';
import colors from '../../data/color.json';

function SelectColor() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const selectedColorSvg = useSelector((state) => state.ui.colorSvg);

    const handleColorChange = (color) => {
        dispatch(setColorSvg(color.svg));
        dispatch(setBackgrnd(color.color));
        setIsActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.dropdown') === null) {
                setIsActive(false);
            }
            console.log(event.target);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <div className="dropdown">
                <div
                    className={`dropdown-toggle drop-style ${isActive ? 'active' : ''}`}
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded={isActive}
                    onClick={() => setIsActive(!isActive)}
                >
                    <img src={selectedColorSvg} alt="" />
                </div>
                <ul
                    className={`dropdown-menu drop-menu-style ${isActive ? 'show' : ''}`}
                    aria-labelledby="dropdownMenu2"
                >
                    {colors.map((color, index) => (
                        <li
                            key={index}
                            onClick={() => handleColorChange(color)}
                            className='item-color'
                        >
                            <div className='main-option'>
                                <img src={color.svg} alt="" />
                                <p className='text-color'>{color["text-color"]}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SelectColor;
