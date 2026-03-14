type Props = {
    error?: Error | null;
}

const MainErrorView = ({error}: Props) => {
  return (
    <section className="container mt-4">
        <h1>Error</h1>
        {error && (
            <div>
                {error.message}
            </div>
        )}
        <p>@ToDo: Añadir instrucciones para el usuario sobre qué hacer en caso de error, y cómo reportarlo.</p>
    </section>
  )
}

export default MainErrorView