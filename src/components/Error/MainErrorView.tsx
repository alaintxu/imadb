"use client";
import Postit from "../Postit";

type Props = {
    error?: Error | null;
}

const MainErrorView = ({error}: Props) => {
  return (
    <section className="container mt-4">
        {error && (
            <div className="flex justify-center mt-16">
                <Postit color="danger">
                    Error:
                    <br/>
                    {error.message}
                </Postit>
            </div>
        )}
    </section>
  )
}

export default MainErrorView