import { Link, Route } from 'react-router-dom';

export const Home = () =>
    <section className="home">
        <h1>[회사 웹사이트]</h1>
        <nav>
            <Link to="about">[회사 소개]</Link>
            <Link to="events">[이벤트]</Link>
            <Link to="products">[제품]</Link>
            <Link to="contact">[고객 지원]</Link>
        </nav>
    </section>

export const About = () =>
    <section className="about">
        <h1>[회사소개]</h1>
    </section>

export const Events = () =>
    <section className="events">
        <h1>[이벤트]</h1>
    </section>

export const Products = () =>
    <section className="products">
        <h1>[제품]</h1>
    </section>

export const Contact = () =>
    <section className="contact">
        <h1>[고객지원]</h1>
    </section>
