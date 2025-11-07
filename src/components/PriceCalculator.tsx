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
    <div className="min-h-screen relative overflow-hidden py-8 px-4 bg-gradient-to-br from-[#FF5DA2] via-[#8E6EFF] via-[#41C7F4] via-[#38E0B7] via-[#FFD873] to-[#FF9A5A]">
      {/* Colorful bokeh light elements - więcej fioletu, błękitu i turkusu */}
      <div className="absolute top-[8%] left-[12%] w-40 h-40 rounded-full bg-[#8E6EFF] opacity-70 blur-[80px] animate-float" />
      <div className="absolute top-[15%] right-[18%] w-48 h-48 rounded-full bg-[#41C7F4] opacity-65 blur-[90px] animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[25%] left-[35%] w-32 h-32 rounded-full bg-[#38E0B7] opacity-75 blur-[70px] animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[45%] right-[25%] w-44 h-44 rounded-full bg-[#8E6EFF] opacity-60 blur-[85px] animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[20%] left-[20%] w-52 h-52 rounded-full bg-[#38E0B7] opacity-55 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[35%] right-[15%] w-36 h-36 rounded-full bg-[#41C7F4] opacity-70 blur-[75px] animate-float" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-[55%] left-[45%] w-28 h-28 rounded-full bg-[#8E6EFF] opacity-80 blur-[60px] animate-float" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-[45%] left-[8%] w-40 h-40 rounded-full bg-[#41C7F4] opacity-65 blur-[80px] animate-float" style={{ animationDelay: '2.3s' }} />
      <div className="absolute top-[35%] right-[8%] w-48 h-48 rounded-full bg-[#38E0B7] opacity-60 blur-[95px] animate-float" style={{ animationDelay: '0.3s' }} />
      <div className="absolute bottom-[10%] right-[35%] w-36 h-36 rounded-full bg-[#8E6EFF] opacity-70 blur-[85px] animate-float" style={{ animationDelay: '1.8s' }} />
      <div className="absolute top-[18%] left-[60%] w-32 h-32 rounded-full bg-[#41C7F4] opacity-75 blur-[70px] animate-float" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-[28%] right-[45%] w-40 h-40 rounded-full bg-[#38E0B7] opacity-65 blur-[90px] animate-float" style={{ animationDelay: '1.4s' }} />
      <div className="absolute top-[65%] left-[25%] w-36 h-36 rounded-full bg-[#8E6EFF] opacity-60 blur-[80px] animate-float" style={{ animationDelay: '2.1s' }} />
      <div className="absolute bottom-[15%] left-[50%] w-28 h-28 rounded-full bg-[#41C7F4] opacity-70 blur-[65px] animate-float" style={{ animationDelay: '0.4s' }} />
      <div className="absolute top-[40%] left-[15%] w-44 h-44 rounded-full bg-[#38E0B7] opacity-55 blur-[95px] animate-float" style={{ animationDelay: '1.6s' }} />
      
      {/* Dodatkowe akcenty kolorystyczne */}
      <div className="absolute top-[5%] right-[35%] w-24 h-24 rounded-full bg-[#FF5DA2] opacity-60 blur-[60px] animate-float" style={{ animationDelay: '0.9s' }} />
      <div className="absolute bottom-[40%] right-[5%] w-28 h-28 rounded-full bg-[#FFD873] opacity-65 blur-[70px] animate-float" style={{ animationDelay: '1.7s' }} />
      <div className="absolute top-[70%] right-[25%] w-32 h-32 rounded-full bg-[#FF9A5A] opacity-60 blur-[75px] animate-float" style={{ animationDelay: '2.2s' }} />
      
      {/* Central bright glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white opacity-20 blur-[150px]" />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full animate-pulse" />
              <Crown className="w-16 h-16 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-float relative z-10" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] tracking-tight">
            Kalkulator Cen
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_25px_rgba(0,0,0,0.4)]">
            Królowej Allegro
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-medium drop-shadow-[0_1px_15px_rgba(0,0,0,0.4)]">
            Oblicz optymalne ceny dla swoich produktów na Allegro z uwzględnieniem prowizji i marży
          </p>
        </div>

        <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#8E6EFF]/40 backdrop-blur-[25px] bg-slate-900/60 shadow-[0_0_30px_rgba(142,110,255,0.3)]">
          <CardHeader className="bg-gradient-to-r from-[#8E6EFF]/25 via-[#41C7F4]/20 to-[#38E0B7]/25 border-b border-white/30">
            <CardTitle className="text-2xl flex items-center gap-2 text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <BarChart3 className="w-7 h-7 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" strokeWidth={2.5} /> Dane produktu
            </CardTitle>
            <CardDescription className="text-white/90 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">Wprowadź cenę netto zakupu i wybierz stawkę VAT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="netPrice" className="text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Cena netto z faktury (PLN)</Label>
                <Input
                  id="netPrice"
                  type="number"
                  placeholder="0.00"
                  value={netPrice}
                  onChange={(e) => setNetPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  className="bg-slate-800/60 border-white/40 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-slate-800/70 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatRate" className="text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Wybierz stawkę VAT</Label>
                <Select value={vatRate} onValueChange={setVatRate}>
                  <SelectTrigger id="vatRate" className="bg-slate-800/60 border-white/40 text-white backdrop-blur-sm">
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
              <div className="pt-4 border-t border-white/30">
                <div className="bg-gradient-to-r from-slate-800/70 to-slate-800/60 rounded-2xl p-6 border border-white/40 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      <DollarSign className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2.5} /> Cena Brutto (Twój koszt):
                    </span>
                    <span className="text-3xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{formatCurrency(calculations.grossCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {calculations && (
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#41C7F4]/40 backdrop-blur-[25px] bg-slate-900/60 shadow-[0_0_30px_rgba(65,199,244,0.3)]">
            <CardHeader className="bg-gradient-to-r from-[#41C7F4]/25 via-[#38E0B7]/20 to-[#8E6EFF]/25 border-b border-white/30">
              <CardTitle className="text-2xl flex items-center gap-2 text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                <TrendingUp className="w-7 h-7 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" strokeWidth={2.5} /> Scenariusze cenowe
              </CardTitle>
              <CardDescription className="text-white/90 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">Porównaj różne marże i wybierz optymalną cenę dla Allegro</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/30 hover:bg-slate-800/40">
                      <TableHead className="font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Zakładany Zysk (Narzut)</TableHead>
                      <TableHead className="font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Cena do wystawienia na Allegro</TableHead>
                      <TableHead className="font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Pobrana Prowizja (15%)</TableHead>
                      <TableHead className="font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Zysk (w zł)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculations.scenarios.map((scenario, index) => (
                      <TableRow key={index} className="hover:bg-slate-800/40 transition-colors border-white/30">
                        <TableCell className="font-bold text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{scenario.markupLabel}</TableCell>
                        <TableCell className="font-extrabold text-xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{formatCurrency(scenario.allegroPrice)}</TableCell>
                        <TableCell className="text-white font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{formatCurrency(scenario.commissionPln)}</TableCell>
                        <TableCell className="text-white font-extrabold text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{formatCurrency(scenario.profitPln)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!calculations && (
          <Card className="shadow-2xl border-2 border-[#38E0B7]/40 backdrop-blur-[25px] bg-slate-900/60 shadow-[0_0_30px_rgba(56,224,183,0.3)]">
            <CardContent className="py-12">
              <div className="text-center space-y-3">
                <Target className="w-16 h-16 mx-auto text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
                <p className="text-lg text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Wprowadź cenę netto, aby zobaczyć obliczenia</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
