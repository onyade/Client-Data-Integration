// User entity class
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  // getters and setters
}

// User repository interface
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

}

// User service interface
public interface UserService {

  User registerUser(User user);

  User loginUser(String email, String password);

}

// User service implementation
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public User registerUser(User user) {
    // check if user with same email already exists
    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser.isPresent()) {
      throw new UserAlreadyExistsException();
    }

    // encrypt password
    String encryptedPassword = encryptPassword(user.getPassword());
    user.setPassword(encryptedPassword);

    // save user to database
    return userRepository.save(user);
  }

  @Override
  public User loginUser(String email, String password) {
    // find user by email
    Optional<User> optionalUser = userRepository.findByEmail(email);
    if (!optionalUser.isPresent()) {
      throw new UserNotFoundException();
    }

    User user = optionalUser.get();

    // verify password
    boolean passwordMatches = verifyPassword(password, user.getPassword());
    if (!passwordMatches) {
      throw new InvalidPasswordException();
    }

    return user;
  }

  private String encryptPassword(String password) {
    // implementation
  }

  private boolean verifyPassword(String password, String hashedPassword) {
    // implementation
  }
}

