/* eslint-disable prettier/prettier */
import { CircleCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      // eslint-disable-next-line prettier/prettier
      .then(response => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                {' '}
                Dia {format(category.date, 'd')}
              </span>
              <span className="text-xs text-zinc-500">
                {' '}
                {format(category.date, 'EEEE', { locale: ptBR })}
              </span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className=" size-5 text-yellow-300" />
                        <span className="text-zinc-100 ">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto ">
                          {format(activity.occurs_at, 'HH:mm')}h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                {' '}
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        )
      })}

      {/* <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold"> Dia 21</span>
          <span className="text-xs text-zinc-500"> Terça-feira</span>
        </div>
        <p className="text-zinc-500 text-sm">
          {' '}
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold"> Dia 22</span>
          <span className="text-xs text-zinc-500"> Quarta-feira</span>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className=" size-5 text-yellow-300" />{' '}
            <span className="text-zinc-100 ">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto ">10:00h</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className=" size-5 text-yellow-300" />{' '}
            <span className="text-zinc-100 ">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto ">10:00h</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}
