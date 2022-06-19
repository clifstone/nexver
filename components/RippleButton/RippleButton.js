import Link from 'next/link'

export default function RippleButton( {url, label} ){
    const createRipple = (e) => {
        let btn = e.currentTarget;
        let boundrect = btn.getBoundingClientRect();
        let circ = document.createElement('span');

        circ.style.top = `${e.clientY - boundrect.top}px`;
        circ.style.left = `${e.clientX - boundrect.left}px`;
        circ.classList.add('ripple');

        let ripple = document.querySelector('.ripple');

        if(ripple){ ripple.remove(); }

        btn.parentNode.appendChild(circ);

    }
    return (
        <Link href="/about"><a onClick={createRipple.bind(this)} className="pagesmenu__anchor">{label}</a></Link>
    );
}