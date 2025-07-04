import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Our Story</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Born from a personal journey of discovering the power of human connection and genuine listening.
        </p>
      </div>

      {/* Founder Story */}
      <section className="mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Meet Annie, Our Founder</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-300">
              <p className="text-lg leading-relaxed">
                Hi, I'm Annie Gonyora, and I created Borrowed Bestie after experiencing firsthand how powerful it can be to simply have someone listen—really listen—when you're going through a tough time.
              </p>
              <p className="leading-relaxed">
                After struggling with anxiety during a major career transition, I found that what I needed most wasn't therapy or advice, but genuine human connection. Someone who could hold space for my feelings without judgment or trying to "fix" me.
              </p>
              <p className="leading-relaxed">
                That's when I realized there are so many people who have this incredible gift of listening, and so many others who just need someone to talk to. Borrowed Bestie bridges that gap, creating meaningful connections that help us all feel a little less alone.
              </p>
              <p className="leading-relaxed">
                What started as a personal struggle became a mission: to make emotional support accessible, affordable, and human. Because sometimes, you don't need professional therapy—you just need someone who cares enough to listen.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="/annie_gonyora.png"
              alt="Annie Gonyora, founder of Borrowed Bestie"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Impact metrics overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Our Impact</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">500+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-coral-500 dark:text-coral-400">95%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Satisfied</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-24">
        <Card className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/20 dark:to-orange-900/20 border-none dark:bg-slate-800">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Our Mission</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              To make emotional support accessible, affordable, and human. We believe everyone deserves to be heard, 
              and everyone has something valuable to offer. Our platform creates safe spaces for genuine human 
              connection, bridging the gap between those who need support and those who are gifted at providing it.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Core Values */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Our Core Values</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">The principles that guide everything we do</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Human Connection</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We believe in the healing power of genuine human connection and authentic listening.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-coral-100 dark:bg-coral-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Safety First</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your safety, privacy, and comfort are our top priorities in every interaction.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌈</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Inclusivity</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We welcome and celebrate people from all backgrounds, identities, and experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Impact */}
      <section className="mb-24">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Making a Difference</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              For every 10 sessions booked, we donate one session to someone in need
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-300">Total Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-coral-500 dark:text-coral-400 mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-300">Free Sessions Given</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 dark:text-purple-400 mb-2">15+</div>
              <div className="text-slate-600 dark:text-slate-300">Communities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-300">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Our Growing Team</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            A diverse group of people passionate about human connection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <img
                src="/annie_gonyora.png"
                alt="Annie - Founder & CEO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Annie Gonyora</h3>
              <Badge variant="secondary" className="mb-3">Founder & CEO</Badge>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Former tech executive turned mental health advocate with a passion for human connection.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Dr. Marcus Johnson - Clinical Advisor"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Dr. Marcus Johnson</h3>
              <Badge variant="secondary" className="mb-3">Clinical Advisor</Badge>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Licensed therapist ensuring our platform maintains the highest safety and ethical standards.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
                alt="Sarah Kim - Head of Listener Relations"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Sarah Kim</h3>
              <Badge variant="secondary" className="mb-3">Listener Relations</Badge>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Dedicated to training and supporting our amazing community of listeners.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
