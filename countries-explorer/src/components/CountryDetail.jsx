import { getCountryByCode } from "../api/countries";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Globe2,
  Users,
  MapPin,
  Flag,
  Languages,
  Map,
  ArrowLeft,
} from "lucide-react";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryByCode(code)
      .then(setCountry)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="text-center mt-12">
        <Globe2 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Country not found
        </h2>
        <p className="text-gray-500 mt-2">
          The country you're looking for doesn't exist in our database.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to countries list
        </Link>
      </div>
    );
  }

  const {
    name,
    flags,
    capital,
    region,
    population,
    languages,
    subregion,
    borders,
    cca3,
    area,
    currencies,
    timezones,
  } = country;

  const [lat, lon] = country.latlng || [0, 0];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lon - 1
  }%2C${lat - 1}%2C${lon + 1}%2C${lat + 1}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to countries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={flags.svg}
                alt={`Flag of ${name.common}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {name.common}
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={<MapPin />}
                  label="Capital"
                  value={capital?.[0] || "N/A"}
                />
                <InfoItem icon={<Globe2 />} label="Region" value={region} />
                <InfoItem icon={<Map />} label="Subregion" value={subregion} />
                <InfoItem
                  icon={<Users />}
                  label="Population"
                  value={population.toLocaleString()}
                />
                <InfoItem
                  icon={<Languages />}
                  label="Languages"
                  value={
                    languages ? Object.values(languages).join(", ") : "N/A"
                  }
                />
                <InfoItem icon={<Flag />} label="Country Code" value={cca3} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Area" value={`${area.toLocaleString()} km²`} />
              <InfoItem
                label="Currencies"
                value={
                  currencies
                    ? Object.values(currencies)
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(", ")
                    : "N/A"
                }
              />
              <InfoItem
                label="Timezones"
                value={timezones?.join(", ") || "N/A"}
              />
              <InfoItem
                label="Border Countries"
                value={borders?.join(", ") || "None"}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Location</h2>
          </div>
          <div className="aspect-square relative">
            <iframe
              title={`Map of ${name.common}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={mapUrl}
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    {icon && <span className="text-gray-400 mt-0.5">{icon}</span>}
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  </div>
);

export default CountryDetail;
