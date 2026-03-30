import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Charities() {
  const [search, setSearch] = useState("");

  const { data: charities, isLoading } = useQuery({
    queryKey: ["charities", search],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/charities?search=${search}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-[#f5f5f0] min-h-[calc(100vh-64px)]">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-[#2c2c28] mb-4">Our Charity Partners</h1>
        <p className="text-[#6b6b63] max-w-2xl mx-auto text-lg leading-relaxed">
          We partner with leading organizations to ensure your contributions make a real impact. 
          Choose the cause that matters most to you.
        </p>
      </div>

      <div className="mb-16 max-w-xl mx-auto relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a3a39b] w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search charities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-4 rounded-full border border-[#d1d1c7] bg-[#fdfdfc] outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all shadow-[0px_4px_20px_rgba(0,0,0,0.03)] text-[#2c2c28]"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-[#6b6b63]">Loading charities...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {charities?.map((charity: any) => (
            <div key={charity.id} className="bg-white rounded-[32px] p-8 border border-[#e8e8e3] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col group">
              <div className="w-16 h-16 bg-[#f5f5f0] rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-[#d1d1c7] group-hover:scale-105 transition-transform">
                {charity.logoUrl ? (
                  <img src={charity.logoUrl} alt={charity.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Heart className="w-8 h-8 text-[#8c3b3b]" />
                )}
              </div>
              <h3 className="text-2xl font-serif text-[#2c2c28] mb-3">{charity.name}</h3>
              <p className="text-[#6b6b63] text-sm mb-8 flex-grow leading-relaxed">{charity.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#e8e8e3]">
                <a 
                  href={charity.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#5A5A40] text-sm font-semibold flex items-center hover:underline underline-offset-4"
                >
                  Visit Website
                  <ExternalLink className="ml-1.5 w-4 h-4" />
                </a>
                <button className="bg-[#f5f5f0] text-[#5A5A40] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#e8e8e3] transition-colors border border-[#d1d1c7]">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
