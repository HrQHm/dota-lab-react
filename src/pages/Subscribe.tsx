import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriverMutation } from "../graphql/types";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriverMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    });

    navigate('/event');
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 leading-tight text-[2.5rem]">
            The Fast Way To Gain <strong className="text-blue-500">MMR</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Learn the tricks of Dota 2 directly from the 0.1% Pro players.
            dota Lab is your quickest way to start dominating.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Seu Nome"
              className="bg-gray-900 px-5 rounded h-14"
              onChange={event => setName(event.target.value)}
            />

            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="bg-gray-900 px-5 rounded h-14"
              onChange={event => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="uppercase rounded bg-green-500 text-gray-200 mt-4 py-4 font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}