
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignupPersonalInfoProps {
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  birthdate: Date | undefined;
  setBirthdate: (date: Date | undefined) => void;
  phone: string;
  setPhone: (phone: string) => void;
  isLoading: boolean;
  handleNext: (e: React.FormEvent) => void;
  handleBack: () => void;
}

const SignupPersonalInfo = ({
  name,
  setName,
  gender,
  setGender,
  birthdate,
  setBirthdate,
  phone,
  setPhone,
  isLoading,
  handleNext,
  handleBack
}: SignupPersonalInfoProps) => {
  return (
    <form onSubmit={handleNext} className="space-y-4 sm:space-y-5">
      <div className="space-y-2">
        <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="name">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                     text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                     pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
            disabled={isLoading}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="gender">
          Gender
        </Label>
        <Select value={gender} onValueChange={setGender} disabled={isLoading}>
          <SelectTrigger 
            className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                     text-[#240046] dark:text-white h-11 sm:h-12 transition-colors duration-300 focus:ring-[#9D4EDD]"
          >
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="birthdate">
          Date of Birth
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="birthdate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-11 sm:h-12",
                "bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0",
                "text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]",
                !birthdate && "text-muted-foreground"
              )}
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthdate ? format(birthdate, "PPP") : <span>Select your birth date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={birthdate}
              onSelect={setBirthdate}
              initialFocus
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="phone">
          Phone Number (Optional)
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                     text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                     pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                   signin-button-hover transition-all duration-300"
          disabled={isLoading}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default SignupPersonalInfo;
