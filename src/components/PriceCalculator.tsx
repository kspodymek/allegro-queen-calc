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
    <div className="min-h-screen bg-gradient-to-br from-[#0d0621] via-[#1a0b35] to-[#08041a] py-8 px-4 relative overflow-hidden">
      {/* Water droplet bokeh elements - exact colors from reference image */}
      <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-[radial-gradient(circle,_#ec4899_0%,_#db2777_50%,_transparent_100%)] opacity-40 rounded-full blur-3xl animate-float" />
      <div className="absolute top-[20%] right-[20%] w-24 h-24 bg-[radial-gradient(circle,_#06b6d4_0%,_#0284c7_50%,_transparent_100%)] opacity-50 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[60%] left-[10%] w-40 h-40 bg-[radial-gradient(circle,_#a855f7_0%,_#9333ea_50%,_transparent_100%)] opacity-35 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[15%] right-[15%] w-36 h-36 bg-[radial-gradient(circle,_#22d3ee_0%,_#06b6d4_50%,_transparent_100%)] opacity-45 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[40%] right-[30%] w-28 h-28 bg-[radial-gradient(circle,_#ec4899_0%,_#a855f7_50%,_transparent_100%)] opacity-40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[40%] left-[25%] w-20 h-20 bg-[radial-gradient(circle,_#3b82f6_0%,_#06b6d4_50%,_transparent_100%)] opacity-60 rounded-full blur-xl animate-float" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[30%] left-[40%] w-16 h-16 bg-[radial-gradient(circle,_#c084fc_0%,_#ec4899_50%,_transparent_100%)] opacity-50 rounded-full blur-lg animate-float" style={{ animationDelay: '1.8s' }} />
      <div className="absolute bottom-[30%] right-[40%] w-44 h-44 bg-[radial-gradient(circle,_#06b6d4_0%,_#3b82f6_50%,_transparent_100%)] opacity-30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2.5s' }} />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-2xl rounded-full animate-pulse" />
              <Crown className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-float relative z-10" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] tracking-tight">
            Kalkulator Cen
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
            Królowej Allegro
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
            Oblicz optymalne ceny dla swoich produktów na Allegro z uwzględnieniem prowizji i marży
          </p>
        </div>

        <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-white/20 backdrop-blur-md bg-white/10">
          <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10">
            <CardTitle className="text-2xl flex items-center gap-2 text-white font-bold">
              <BarChart3 className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" strokeWidth={2.5} /> Dane produktu
            </CardTitle>
            <CardDescription className="text-gray-200 font-medium">Wprowadź cenę netto zakupu i wybierz stawkę VAT</CardDescription>
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
              <div className="pt-4 border-t border-white/10">
                <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg p-5 border-2 border-white/20">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-lg font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" strokeWidth={2.5} /> Cena Brutto (Twój koszt):
                    </span>
                    <span className="text-3xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{formatCurrency(calculations.grossCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {calculations && (
          <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-white/20 backdrop-blur-md bg-white/10">
            <CardHeader className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-white/10">
              <CardTitle className="text-2xl flex items-center gap-2 text-white font-bold">
                <TrendingUp className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" strokeWidth={2.5} /> Scenariusze cenowe
              </CardTitle>
              <CardDescription className="text-gray-200 font-medium">Porównaj różne marże i wybierz optymalną cenę dla Allegro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="font-bold text-white">Zakładany Zysk (Narzut)</TableHead>
                      <TableHead className="font-bold text-white">Cena do wystawienia na Allegro</TableHead>
                      <TableHead className="font-bold text-white">Pobrana Prowizja (15%)</TableHead>
                      <TableHead className="font-bold text-white">Zysk (w zł)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculations.scenarios.map((scenario, index) => (
                      <TableRow key={index} className="hover:bg-white/10 transition-colors border-white/10">
                        <TableCell className="font-bold text-lg text-white">{scenario.markupLabel}</TableCell>
                        <TableCell className="font-extrabold text-xl text-white">{formatCurrency(scenario.allegroPrice)}</TableCell>
                        <TableCell className="text-pink-400 font-bold drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]">{formatCurrency(scenario.commissionPln)}</TableCell>
                        <TableCell className="text-cyan-400 font-extrabold text-xl drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{formatCurrency(scenario.profitPln)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!calculations && (
          <Card className="shadow-2xl border-2 border-white/20 backdrop-blur-md bg-white/10">
            <CardContent className="py-12">
              <div className="text-center space-y-3">
                <Target className="w-16 h-16 mx-auto text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.6)]" strokeWidth={2.5} />
                <p className="text-lg text-white font-bold">Wprowadź cenę netto, aby zobaczyć obliczenia</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
