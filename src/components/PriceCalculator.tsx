import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Crown, BarChart3, DollarSign, TrendingUp, Target } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-bg py-8 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <Crown className="w-16 h-16 text-primary animate-float relative z-10" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-title bg-clip-text text-transparent">
            Kalkulator Cen
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-title bg-clip-text text-transparent">
            Królowej Allegro
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oblicz optymalne ceny dla swoich produktów na Allegro z uwzględnieniem prowizji i marży
          </p>
        </div>

        <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-primary/30 backdrop-blur-sm bg-card/95">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> Dane produktu
            </CardTitle>
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
                <div className="bg-gradient-to-r from-cost/10 to-cost/5 rounded-lg p-5 border-2 border-cost/20">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-cost" /> Cena Brutto (Twój koszt):
                    </span>
                    <span className="text-3xl font-bold text-cost">{formatCurrency(calculations.grossCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {calculations && (
          <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-profit/30 backdrop-blur-sm bg-card/95">
            <CardHeader className="bg-gradient-to-r from-profit/10 to-primary/10 border-b border-border">
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-profit" /> Scenariusze cenowe
              </CardTitle>
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
                      <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-lg">{scenario.markupLabel}</TableCell>
                        <TableCell className="font-bold text-lg">{formatCurrency(scenario.allegroPrice)}</TableCell>
                        <TableCell className="text-cost font-semibold">{formatCurrency(scenario.commissionPln)}</TableCell>
                        <TableCell className="text-profit font-bold text-lg">{formatCurrency(scenario.profitPln)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!calculations && (
          <Card className="shadow-2xl border-2 border-muted backdrop-blur-sm bg-card/95">
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground space-y-3">
                <Target className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-lg">Wprowadź cenę netto, aby zobaczyć obliczenia</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
