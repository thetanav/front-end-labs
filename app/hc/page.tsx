import { cn } from "@/lib/utils";
import { Tiro_Devanagari_Hindi } from "next/font/google";

const pop = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: ["400"],
});

export default function Page() {
  return (
    <article className={cn("max-w-2xl mx-auto py-12 px-6", pop.className)}>
      <h1 className="text-3xl font-bold text-center text-amber-700 mb-2">
        श्री हनुमान चालीसा
      </h1>
      <div className="w-24 h-1 bg-amber-500 mx-auto mb-10 rounded-full"></div>

      {/* Doha */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-amber-600 text-center mb-6">
          ॥ दोहा ॥
        </h2>
        <div className="space-y-4 text-lg text-gray-800 leading-relaxed text-center">
          <p className="font-medium">
            श्री गुरु चरण सरोज रज, निज मनु मुकुरु सुधारि।
          </p>
          <p className="font-medium">वरनऊँ रघुवर विमल जसु, जो दायकु फल चारि॥</p>
          <p className="font-medium">बुद्धिहीन तनु जानिके, सुमिरो पवन कुमार।</p>
          <p className="font-medium">
            बल बुद्धि विद्या देहु मोहिं, हरहु कलेश विकार॥
          </p>
        </div>
      </section>

      {/* Chaupai */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-amber-600 text-center mb-6">
          ॥ चौपाई ॥
        </h2>
        <div className="space-y-3 text-lg text-gray-800 leading-relaxed text-center">
          <p>जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥</p>
          <p>राम दूत अतुलित बल धामा। अंजनिपुत्र पवन सुत नामा॥</p>
          <p>महावीर बिक्रम बजरंगी। कुमति निवार सुमिति के संगी॥</p>
          <p>कंचन वरन विराज सुवेसा। कानन कुंडल कुंचित केसा॥</p>
          <p className="text-amber-600 text-sm">॥४॥</p>

          <p>हाथ बज्र औ ध्वजा विराजै। काँधे मूँज जनेऊ साजै॥</p>
          <p>शंकर सुवन केसरीनंदन। तेज प्रताप महा जग बंदन॥</p>
          <p>विद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥</p>
          <p>प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥</p>
          <p className="text-amber-600 text-sm">॥८॥</p>

          <p>सूक्ष्म रूप धरि सियहि दिखावा। बिकट रूप धरि लंक जरावा॥</p>
          <p>भीम रूप धरि असुर सँहारे। रामचंन्द्र के काज सँवारे॥</p>
          <p>लाय सजीवन लखन जियाये। श्री रघुबीर हरषि उर लाये॥</p>
          <p>रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरत सम भाई॥</p>
          <p className="text-amber-600 text-sm">॥१२॥</p>

          <p>सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥</p>
          <p>सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥</p>
          <p>जम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सके कहाँ ते॥</p>
          <p>तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥</p>
          <p className="text-amber-600 text-sm">॥१६॥</p>

          <p>तुम्हरो मंत्र विभीषन माना। लंकेश्वर भये सब जग जाना॥</p>
          <p>जुग सहस्त्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥</p>
          <p>प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥</p>
          <p>दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥</p>
          <p className="text-amber-600 text-sm">॥२०॥</p>

          <p>राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥</p>
          <p>सब सुख लहैं तुम्हारी सरना। तुम रक्षक काहू को डरना॥</p>
          <p>आपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥</p>
          <p>भूत पिसाच निकट नहिं आवै। महावीर जब नाम सुनावैं॥</p>
          <p className="text-amber-600 text-sm">॥२४॥</p>

          <p>नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥</p>
          <p>संकट तें हनुमान छुड़ावै। मन क्रम वचन ध्यान जो लावै॥</p>
          <p>सब पर राम तपस्वीं राजा। तिन के काज सकल तुम साजा॥</p>
          <p>और मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥</p>
          <p className="text-amber-600 text-sm">॥२८॥</p>

          <p>चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥</p>
          <p>साधु संत के तुम रखबारे। असुर निकंदन राम दुलारे॥</p>
          <p>अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥</p>
          <p>राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥</p>
          <p className="text-amber-600 text-sm">॥३२॥</p>

          <p>तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥</p>
          <p>अंत काल रघुबर पुर जाई। जहाँ जन्म हरि भक्त कहाई॥</p>
          <p>और देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥</p>
          <p>संकट कटै मिटै सब पीरा। जो सुमिरैं हनुमत बलबीरा॥</p>
          <p className="text-amber-600 text-sm">॥३६॥</p>

          <p>जै जै जै हनुमान गोसाईं। कृपा करहु गुरू देव की नाईं॥</p>
          <p>जो सत बार पाठ कर कोई। छूटहि बन्दि महासुख होई॥</p>
          <p>जो यह पढै हनुमान चलीसा। होय सिद्धि साखी गौरीसा॥</p>
          <p>तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥</p>
          <p className="text-amber-600 text-sm">॥४०॥</p>
        </div>
      </section>

      {/* Closing Doha */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-amber-600 text-center mb-6">
          ॥ दोहा ॥
        </h2>
        <div className="space-y-4 text-lg text-gray-800 leading-relaxed text-center font-medium">
          <p>पवनतनय संकट हरन, मंगल मूरति रुप।</p>
          <p>राम लखन सीता सहित, हृदय बसहु सुर भूप॥</p>
        </div>
      </section>

      {/* Mangalacharan */}
      <section className="border-t-2 border-amber-200 pt-8 mt-8">
        <div className="space-y-2 text-center text-lg text-amber-700 font-semibold">
          <p>॥ सियावर रामचंद्र की जय ॥</p>
          <p>॥ पवन सुत हनुमान की जय ॥</p>
          <p>॥ उमापति महादेव की जय ॥</p>
          <p className="mt-4 text-xl">श्री राम जय राम जय जय राम ॥</p>
          <p className="text-xl">श्री राम जय राम जय जय राम ॥</p>
        </div>
      </section>
    </article>
  );
}
