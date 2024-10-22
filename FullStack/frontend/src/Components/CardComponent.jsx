import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Update path as needed

function CardComponent({
  bgColor,
  icon: Icon,
  iconColor,
  titleSize,
  value,
  description,
}) {
  return (
    <Card
      className={`shadow-lg transition-transform duration-300 transform hover:scale-105 ${bgColor}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Icon className={`text-5xl ${iconColor}`} />
        <CardTitle className={`${titleSize}`}>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-700">{description}</div>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
