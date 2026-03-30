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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Charity Partners</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We partner with leading organizations to ensure your contributions make a real impact. 
          Choose the cause that matters most to you.
        </p>
      </div>

      <div className="mb-12 max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search charities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-20">Loading charities...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {charities?.map((charity: any) => (
            <div key={charity.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-gray-100">
                {charity.logoUrl ? (
                  <img src={charity.logoUrl} alt={charity.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Heart className="w-8 h-8 text-red-500" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{charity.name}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{charity.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                <a 
                  href={charity.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 text-sm font-bold flex items-center hover:underline"
                >
                  Visit Website
                  <ExternalLink className="ml-1 w-4 h-4" />
                </a>
                <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">
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
