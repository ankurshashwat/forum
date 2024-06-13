import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface SwitcherProps {
  query: string;
  label: string;
}

const Switcher = ({ query, label }: SwitcherProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get(query);

  const handleUpdateParams = (value: string) => {
    let newUrl;

    if (!value) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [query],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: query,
        value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <Switch
        id={`${query}-switcher`}
        className="ml-4 mr-2"
        checked={paramFilter === "true"}
        onCheckedChange={(checked) => handleUpdateParams(checked ? "true" : "")}
      />
      <Label htmlFor={`${query}-switcher`} className="text-light-500">
        {label}
      </Label>
    </>
  );
};

export default Switcher;
