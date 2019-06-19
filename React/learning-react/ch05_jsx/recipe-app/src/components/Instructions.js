const Instructions = ({ title, steps }) => (
    <section className="instructions">
        <h2>{ title }</h2>
        {steps.map((step, i) =>
            (<p key={i}>{step}</p>)
        )}
    </section>
);

export default Instructions;