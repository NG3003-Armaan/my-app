export default function OneViewRow(props: { label: string; value: string }) {
  return (
    <div className="flex border-b px-4 py-3">
      <p className="flex-[0.4]">{props.label}</p>
      <p className="flex-[0.6] font-medium">{props.value}</p>
    </div>
  )
}
