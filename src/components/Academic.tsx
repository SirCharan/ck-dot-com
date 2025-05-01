import React from 'react';
interface AcademicItem {
  title: string;
  details: string;
}
const academics: AcademicItem[] = [{
  title: "B.Tech",
  details: "IIT Kanpur (2018-2022)"
}, {
  title: "JEE Advanced 2018",
  details: "AIR 638"
}, {
  title: "JEE Main 2018",
  details: "AIR 272"
}, {
  title: "CAT 2022",
  details: "99.79%ile"
}, {
  title: "CAT 2023",
  details: "99.85%ile"
}, {
  title: "CAT 2024",
  details: "98.80%ile"
}, {
  title: "National Maths Olympiad",
  details: "AIR 3"
}];
const certifications: AcademicItem[] = [{
  title: "NTSE, KVPY Scholar",
  details: ""
}, {
  title: "NISM Series VA",
  details: "Mutual Fund Distributor"
}, {
  title: "NISM Series VIII",
  details: "Equity Derivatives"
}, {
  title: "NISM Series XV",
  details: "Research Analyst"
}];
const Academic: React.FC = () => {
  return <section id="academic" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Academic Background</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Education & Achievements</h3>
            <div className="glass-card p-6">
              <div className="space-y-6">
                {academics.map((item, index) => <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0 animate-fade-in" style={{
                animationDelay: `${index * 100}ms`
              }}>
                    <h4 className="text-crypto-purple font-semibold">{item.title}</h4>
                    <p className="text-gray-300 mt-1">{item.details}</p>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Certifications</h3>
            <div className="glass-card p-6">
              <div className="space-y-6">
                {certifications.map((item, index) => <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0 animate-fade-in" style={{
                animationDelay: `${index * 100 + 400}ms`
              }}>
                    <h4 className="text-crypto-purple font-semibold">{item.title}</h4>
                    {item.details && <p className="text-gray-300 mt-1">{item.details}</p>}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>;
};
export default Academic;