"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export interface FilterFormValues {
  operatingMarginMin?: number;
  perMax?: number;
  debtRatioMax?: number;
  majorShareholderMin?: number;
  majorShareholderMax?: number;
}

interface FilterPanelProps {
  onSubmit: (values: FilterFormValues) => void;
  onReset?: () => void;
}

const defaultValues: FilterFormValues = {
  operatingMarginMin: 10,
  perMax: 15,
  debtRatioMax: 100,
  majorShareholderMin: 30,
  majorShareholderMax: 50,
};

export function FilterPanel({ onSubmit, onReset }: FilterPanelProps) {
  const form = useForm<FilterFormValues>({
    defaultValues,
  });

  const handleReset = () => {
    form.reset(defaultValues);
    onReset?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>필터 조건</CardTitle>
        <p className="text-sm text-muted-foreground">
          재무·지배구조 조건을 설정하세요
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="operatingMarginMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>영업이익률 최소 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="perMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PER 최대 (배)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debtRatioMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>부채비율 최대 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="majorShareholderMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대주주 지분 최소 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="majorShareholderMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대주주 지분 최대 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">적용</Button>
              {onReset && (
                <Button type="button" variant="outline" onClick={handleReset}>
                  초기화
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
