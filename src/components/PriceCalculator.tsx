import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PriceCalculator = () => {
  const [netPrice, setNetPrice] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("23");

  const calculations = useMemo(() => {
    const netPriceNum = parseFloat(netPrice);
    
    if (!netPrice || isNaN(netPriceNum) || netPriceNum <= 0) {
      return null;
    }

    const ALLEGRO_COMMISSION = 0.15;
    const PRICE_COEFFICIENT = 1 - ALLEGRO_COMMISSION; // 0.85

    // Calculate VAT multiplier
    const vatMultiplier = vatRate === "5" ? 1.05 : 1.23;
    
    // Calculate gross cost
    const grossCost = netPriceNum * vatMultiplier;

    // Calculate scenarios
    const scenarios = [
      { markup: 0.10, label: "10%" },
      { markup: 0.15, label: "15%" },
      { markup: 0.20, label: "20%" },
    ].map(({ markup, label }) => {
      const profitPln = grossCost * markup;
      const allegroPrice = (grossCost + profitPln) / PRICE_COEFFICIENT;
      const commissionPln = allegroPrice * ALLEGRO_COMMISSION;

      return {
        markupLabel: label,
        allegroPrice: allegroPrice.toFixed(2),
        commissionPln: commissionPln.toFixed(2),
        profitPln: profitPln.toFixed(2),
      };
    });

    return {
      grossCost: grossCost.toFixed(2),
      scenarios,
    };
  }, [netPrice, vatRate]);

  const formatCurrency = (value: string) => {
    return `${value} zł`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Kalkulator Cen Królowej Allegro</h1>
          <p className="text-muted-foreground">Oblicz optymalne ceny dla swoich produktów na Allegro</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dane produktu</CardTitle>
            <CardDescription>Wprowadź cenę netto zakupu i wybierz stawkę VAT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="netPrice">Cena netto z faktury (PLN)</Label>
                <Input
                  id="netPrice"
                  type="number"
                  placeholder="0.00"
                  value={netPrice}
                  onChange={(e) => setNetPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatRate">Wybierz stawkę VAT</Label>
                <Select value={vatRate} onValueChange={setVatRate}>
                  <SelectTrigger id="vatRate">
                    <SelectValue placeholder="Wybierz VAT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="23">23%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {calculations && (
              <div className="pt-4 border-t">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Cena Brutto (Twój koszt):</span>
                    <span className="text-2xl font-bold text-cost">{formatCurrency(calculations.grossCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {calculations && (
          <Card>
            <CardHeader>
              <CardTitle>Scenariusze cenowe</CardTitle>
              <CardDescription>Porównaj różne marże i wybierz optymalną cenę dla Allegro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Zakładany Zysk (Narzut)</TableHead>
                      <TableHead className="font-semibold">Cena do wystawienia na Allegro</TableHead>
                      <TableHead className="font-semibold">Pobrana Prowizja (15%)</TableHead>
                      <TableHead className="font-semibold">Zysk (w zł)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculations.scenarios.map((scenario, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{scenario.markupLabel}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(scenario.allegroPrice)}</TableCell>
                        <TableCell className="text-cost">{formatCurrency(scenario.commissionPln)}</TableCell>
                        <TableCell className="text-profit font-semibold">{formatCurrency(scenario.profitPln)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!calculations && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <p>Wprowadź cenę netto, aby zobaczyć obliczenia</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
