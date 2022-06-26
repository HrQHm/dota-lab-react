import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({
  title,
  slug,
  availableAt,
  type
}: LessonProps) {

  const { slug: slugParams } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE ' • 'd' de 'MMMM' • 'K'h'mm", {
    locale: ptBr
  });

  const isActive = slugParams === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isActive
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("text-sm  font-medium flex items-center gap-2", {
              'text-white': isActive,
              'text-blue-500': !isActive,
            })}>
              <CheckCircle size={20} />
              Conteúdo libero
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border", {
            'border-white': isActive,
            'border-[#00B37E]': !isActive,
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={classNames("mt-5 block", {
            'text-white': isActive,
            'text-gray-200': !isActive,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>

  );
}