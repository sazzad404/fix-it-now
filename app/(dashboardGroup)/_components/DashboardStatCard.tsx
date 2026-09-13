import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

const DashboardStatCard = ({
  title,
  value,
  description,
  icon: Icon,
}: Props) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:-translate-y-1 hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {title}
        </p>

        <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
          <Icon size={20} />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-1 text-xs text-zinc-500">
        {description}
      </p>
    </div>
  );
};

export default DashboardStatCard;