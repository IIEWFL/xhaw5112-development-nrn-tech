import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch,Linking,Alert
} from 'react-native';

// Theme colors
const THEME = {
  blue: '#2980b9',
  red: '#c0392b',
  white: '#ffffff',
  light: '#f6f8ff',
  border: '#e6efff',
  muted: '#6b7280'
};

// Define types for our data
type Course = {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  skills: string[];
};

type ApplicationForm = {
  firstName: string;
  lastName: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  selectedCourses: string[];
};

// Sample course data
const courses: Course[] = [
  {
    id: '1',
    name: 'Child Minding',
    price: 750,
    duration: '6 weeks',
    category: '6 Week Courses',
    description: 'Learn professional childcare skills, safety procedures, and child development basics. This course covers everything from basic child psychology to emergency procedures, ensuring you can provide safe and nurturing care for children of all ages.',
    skills: [
      'Child Safety & Protection',
      'Basic First Aid for Children',
      'Educational Play Activities',
      'Child Nutrition & Health',
      'Behavior Management',
      'Emergency Procedures'
    ]
  },
  {
    id: '2',
    name: 'Garden Maintenance',
    price: 750,
    duration: '6 weeks',
    category: '6 Week Courses',
    description: 'Learn essential gardening skills and maintenance techniques for residential and commercial properties.',
    skills: [
      'Plant Identification',
      'Soil Preparation',
      'Pruning Techniques',
      'Irrigation Systems',
      'Weed Control',
      'Seasonal Maintenance'
    ]
  },
  {
    id: '3',
    name: 'Cooking',
    price: 750,
    duration: '6 weeks',
    category: '6 Week Courses',
    description: 'Develop culinary skills for home cooking or catering opportunities. From basic knife skills to advanced cooking techniques, learn to prepare nutritious, delicious meals while understanding food safety and cost management.',
    skills: [
      'Food Safety & Hygiene',
      'Meal Planning & Prep',
      'Basic to Advanced Cooking Techniques',
      'Cost-Effective Shopping',
      'Nutritional Knowledge',
      'Kitchen Equipment Usage'
    ]
  },
  {
    id: '4',
    name: 'First Aid',
    price: 1500,
    duration: '6 months',
    category: '6 Month Courses',
    description: 'Comprehensive first aid training with certification for workplace safety. This accredited course prepares you to handle medical emergencies confidently and could lead to employment opportunities in various sectors.',
    skills: [
      'CPR Certification',
      'Emergency Response Procedures',
      'Wound Care & Treatment',
      'Medical Equipment Usage',
      'Trauma Assessment',
      'Patient Communication'
    ]
  },
  {
    id: '5',
    name: 'Sewing',
    price: 1500,
    duration: '6 months',
    category: '6 Month Courses',
    description: 'Master sewing techniques from basic stitches to garment construction for personal use or small business opportunities.',
    skills: [
      'Basic Stitches',
      'Pattern Reading',
      'Fabric Selection',
      'Garment Construction',
      'Alteration Techniques',
      'Sewing Machine Operation'
    ]
  },
  {
    id: '6',
    name: 'Landscaping',
    price: 1500,
    duration: '6 months',
    category: '6 Month Courses',
    description: 'Learn professional landscaping techniques for designing and maintaining beautiful outdoor spaces.',
    skills: [
      'Landscape Design',
      'Plant Selection',
      'Hardscaping',
      'Garden Layout',
      'Sustainable Practices',
      'Project Estimation'
    ]
  },
  {
    id: '7',
    name: 'Life Skills',
    price: 1500,
    duration: '6 months',
    category: '6 Month Courses',
    description: 'Develop essential life skills for personal growth and independence in various aspects of daily living.',
    skills: [
      'Financial Literacy',
      'Time Management',
      'Communication Skills',
      'Problem Solving',
      'Decision Making',
      'Stress Management'
    ]
  }
];

// Home Screen Component
const HomeScreen = ({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Empowering the Nations</Text>
        <Text style={styles.subtitle}>Skills Development College</Text>
      </View>
      
      <View style={styles.welcomeSection}>
        <Text style={styles.sectionTitle}>Welcome to Your Future</Text>
        <Text style={styles.paragraph}>
          Never too late to learn new skills! Join our community of learners and boost your earning potential.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Students Trained</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Course Options</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentScreen('Courses')}
        >
          <Text style={styles.buttonText}>View All Courses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentScreen('FeeCalculator')}
        >
          <Text style={styles.buttonText}>Fee Calculator</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentScreen('Application')}
        >
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentScreen('Contact')}
        >
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Courses Screen Component
const CoursesScreen = ({ 
  setCurrentScreen, 
  setSelectedCourse 
}: { 
  setCurrentScreen: (screen: string) => void;
  setSelectedCourse: (course: Course) => void;
}) => {
  const sixWeekCourses = courses.filter(course => course.category === '6 Week Courses');
  const sixMonthCourses = courses.filter(course => course.category === '6 Month Courses');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Our Courses</Text>
      </View>
      
      <Text style={styles.categoryTitle}>6 Week Courses - R750 each</Text>
      {sixWeekCourses.map(course => (
        <TouchableOpacity 
          key={course.id}
          style={styles.courseItem}
          onPress={() => {
            setSelectedCourse(course);
            setCurrentScreen('CourseDetail');
          }}
        >
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.coursePrice}>R{course.price}</Text>
          <Text style={styles.courseDuration}>{course.duration}</Text>
        </TouchableOpacity>
      ))}
      
      <Text style={styles.categoryTitle}>6 Month Courses - R1500 each</Text>
      {sixMonthCourses.map(course => (
        <TouchableOpacity 
          key={course.id}
          style={styles.courseItem}
          onPress={() => {
            setSelectedCourse(course);
            setCurrentScreen('CourseDetail');
          }}
        >
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.coursePrice}>R{course.price}</Text>
          <Text style={styles.courseDuration}>{course.duration}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Course Detail Screen Component
const CourseDetailScreen = ({ 
  course, 
  setCurrentScreen 
}: { 
  course: Course; 
  setCurrentScreen: (screen: string) => void;
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Courses')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{course.name}</Text>
      </View>
      
      <Text style={styles.coursePrice}>R{course.price}</Text>
      <Text style={styles.courseDuration}>{course.duration}</Text>
      
      <Text style={styles.paragraph}>{course.description}</Text>
      
      <Text style={styles.sectionTitle}>Skills You'll Learn:</Text>
      {course.skills.map((skill: string, index: number) => (
        <Text key={index} style={styles.skillItem}>• {skill}</Text>
      ))}
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setCurrentScreen('Application')}
      >
        <Text style={styles.buttonText}>Apply for This Course - R{course.price}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => setCurrentScreen('FeeCalculator')}
      >
        <Text style={styles.buttonText}>Calculate Multiple Course Fees</Text>
      </TouchableOpacity>
      
      <Text style={styles.noteText}>
        Get discounts when you enroll in multiple courses!
      </Text>
    </ScrollView>
  );
};

// Fee Calculator Screen Component
const FeeCalculatorScreen = ({ 
  setCurrentScreen 
}: { 
  setCurrentScreen: (screen: string) => void;
}) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  
  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };
  
  const calculateSubtotal = () => {
    return selectedCourses.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return total + (course ? course.price : 0);
    }, 0);
  };
  
  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return selectedCourses.length > 1 ? subtotal * 0.05 : 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Fee Calculator</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Select Your Courses:</Text>
      
      <Text style={styles.categoryTitle}>6 Week Courses</Text>
      {courses.filter(course => course.category === '6 Week Courses').map(course => (
        <View key={course.id} style={styles.courseSelectionItem}>
          <Text style={styles.courseSelectionText}>
            {course.name} - R{course.price} - {course.duration}
          </Text>
          <Switch
            value={selectedCourses.includes(course.id)}
            onValueChange={() => toggleCourse(course.id)}
          />
        </View>
      ))}
      
      <Text style={styles.categoryTitle}>6 Month Courses</Text>
      {courses.filter(course => course.category === '6 Month Courses').map(course => (
        <View key={course.id} style={styles.courseSelectionItem}>
          <Text style={styles.courseSelectionText}>
            {course.name} - R{course.price} - {course.duration}
          </Text>
          <Switch
            value={selectedCourses.includes(course.id)}
            onValueChange={() => toggleCourse(course.id)}
          />
        </View>
      ))}
      
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Fee Summary:</Text>
        
        {selectedCourses.map(courseId => {
          const course = courses.find(c => c.id === courseId);
          return course ? (
            <Text key={course.id} style={styles.summaryItem}>{course.name}</Text>
          ) : null;
        })}
        
        <View style={styles.summaryLine}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>R{calculateSubtotal()}</Text>
        </View>
        
        <View style={styles.summaryLine}>
          <Text style={styles.summaryLabel}>Discount (5%):</Text>
          <Text style={styles.summaryValue}>-R{calculateDiscount()}</Text>
        </View>
        
        <View style={styles.summaryLine}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryTotal}>R{calculateTotal()}</Text>
        </View>
        
        {selectedCourses.length > 1 && (
          <Text style={styles.savingsText}>
            You're saving R{calculateDiscount()} with our multi-course discount!
          </Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setCurrentScreen('Application')}
      >
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Application Form Screen Component
const ApplicationScreen = ({ 
  setCurrentScreen 
}: { 
  setCurrentScreen: (screen: string) => void;
}) => {
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: '',
    lastName: '',
    idNumber: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    selectedCourses: []
  });
  
  const handleInputChange = (field: keyof ApplicationForm, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const toggleCourse = (courseId: string) => {
    const updatedCourses = formData.selectedCourses.includes(courseId)
      ? formData.selectedCourses.filter(id => id !== courseId)
      : [...formData.selectedCourses, courseId];
    
    setFormData({ ...formData, selectedCourses: updatedCourses });
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.idNumber || 
        !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (formData.selectedCourses.length === 0) {
      Alert.alert('Error', 'Please select at least one course');
      return;
    }
    
    // In a real app, you would submit this data to a server
    Alert.alert(
      'Application Submitted', 
      'Thank you for your application! We will contact you soon.',
      [{ text: 'OK', onPress: () => setCurrentScreen('Home') }]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Application Form</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name *"
        value={formData.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Number *"
        value={formData.idNumber}
        onChangeText={(text) => handleInputChange('idNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        value={formData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address *"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City *"
        value={formData.city}
        onChangeText={(text) => handleInputChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code *"
        value={formData.postalCode}
        onChangeText={(text) => handleInputChange('postalCode', text)}
        keyboardType="numeric"
      />
      
      <Text style={styles.sectionTitle}>Course Selection</Text>
      {courses.map(course => (
        <View key={course.id} style={styles.courseCheckboxItem}>
          <Text style={styles.courseCheckboxText}>
            {course.name} - R{course.price} - {course.duration}
          </Text>
          <Switch
            value={formData.selectedCourses.includes(course.id)}
            onValueChange={() => toggleCourse(course.id)}
          />
        </View>
      ))}
      
      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Contact Screen Component
const ContactScreen = ({ 
  setCurrentScreen 
}: { 
  setCurrentScreen: (screen: string) => void;
}) => {
  const callNumber = () => {
    Linking.openURL('tel:0111234567');
  };
  
  const sendEmail = () => {
    Linking.openURL('mailto:info@empoweringnations.co.za');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Contact Us</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Get in Touch</Text>
      
      <TouchableOpacity style={styles.contactItem} onPress={callNumber}>
        <Text style={styles.contactLabel}>Phone</Text>
        <Text style={styles.contactValue}>011 123 4567</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.contactItem} onPress={sendEmail}>
        <Text style={styles.contactLabel}>Email</Text>
        <Text style={styles.contactValue}>info@empoweringnations.co.za</Text>
      </TouchableOpacity>
      
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>Address</Text>
        <Text style={styles.contactValue}>Johannesburg, Gauteng</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Office Hours</Text>
      <View style={styles.hoursContainer}>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Monday - Friday:</Text>
          <Text style={styles.hoursTime}>8:00 AM - 5:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Saturday:</Text>
          <Text style={styles.hoursTime}>9:00 AM - 1:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Sunday:</Text>
          <Text style={styles.hoursTime}>Closed</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Ready to Start Learning?</Text>
      <Text style={styles.paragraph}>Call us today to enroll in any of our courses</Text>
      
      <TouchableOpacity style={styles.primaryButton} onPress={callNumber}>
        <Text style={styles.buttonText}>011 123 4567</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Courses':
        return <CoursesScreen setCurrentScreen={setCurrentScreen} setSelectedCourse={setSelectedCourse} />;
      case 'CourseDetail':
        return selectedCourse ? <CourseDetailScreen course={selectedCourse} setCurrentScreen={setCurrentScreen} /> : <HomeScreen setCurrentScreen={setCurrentScreen} />;
      case 'FeeCalculator':
        return <FeeCalculatorScreen setCurrentScreen={setCurrentScreen} />;
      case 'Application':
        return <ApplicationScreen setCurrentScreen={setCurrentScreen} />;
      case 'Contact':
        return <ContactScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <HomeScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      {renderScreen()}
    </View>
  );
}

// Styles - Blue white and red theme
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.white,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: THEME.blue,
    paddingBottom: 20,
    backgroundColor: THEME.white
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
    paddingBottom: 10,
    backgroundColor: THEME.white
  },
  backButton: {
    marginRight: 15,
    paddingTop: 26,
  },
  backButtonText: {
    fontSize: 16,
    color: THEME.blue,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.blue,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: THEME.muted,
    textAlign: 'center',
    marginTop: 5,
  },
  welcomeSection: {
    marginBottom: 30,
    backgroundColor: THEME.light,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.blue,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: THEME.blue,
    borderBottomWidth: 2,
    borderBottomColor: THEME.blue,
    paddingBottom: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    color: THEME.blue,
    backgroundColor: THEME.border,
    padding: 10,
    borderRadius: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: THEME.muted,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
    backgroundColor: THEME.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.blue,
  },
  statLabel: {
    fontSize: 16,
    color: THEME.muted,
    marginTop: 5,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: THEME.blue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  secondaryButton: {
    backgroundColor: THEME.red,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: THEME.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  courseItem: {
    backgroundColor: THEME.white,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.blue,
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 16,
    color: THEME.red,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDuration: {
    fontSize: 14,
    color: THEME.muted,
  },
  skillItem: {
    fontSize: 16,
    marginBottom: 8,
    color: THEME.muted,
    paddingLeft: 5,
  },
  noteText: {
    fontSize: 14,
    color: THEME.muted,
    marginTop: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  courseSelectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.white,
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  courseSelectionText: {
    fontSize: 16,
    color: THEME.muted,
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: THEME.white,
    padding: 20,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryItem: {
    fontSize: 16,
    color: THEME.muted,
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: THEME.blue,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    paddingTop: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: THEME.muted,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 16,
    color: THEME.muted,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.blue,
  },
  savingsText: {
    fontSize: 16,
    color: THEME.white,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    backgroundColor: THEME.blue,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: THEME.white,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    fontSize: 16,
  },
  courseCheckboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.white,
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  courseCheckboxText: {
    fontSize: 16,
    color: THEME.muted,
    flex: 1,
  },
  contactItem: {
    backgroundColor: THEME.white,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.blue,
  },
  contactLabel: {
    fontSize: 14,
    color: THEME.muted,
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 16,
    color: THEME.muted,
    fontWeight: '500',
  },
  hoursContainer: {
    backgroundColor: THEME.white,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hoursDay: {
    fontSize: 16,
    color: THEME.muted,
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 16,
    color: THEME.muted,
  },
});
