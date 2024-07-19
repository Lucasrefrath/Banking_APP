//
//  ProfilePage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct ProfilePageView: View {
    
    @AppStorage("SESSION_COOKIE") private var sessionCookie = ""
    private var isActive: Bool = false
    
    func nothing() -> Void {
        print("test")
    }
    
    var body: some View {

        Form {
            NavigationLink(destination: EditProfilePage()) {
                Section{
                    HStack(spacing: 20) {
                        Image(systemName: "person.circle.fill")
                            .resizable()
                            .frame(width: 75, height: 75)
                            .scaledToFit()
                        
                        VStack(alignment: .leading){
                            Text("Lucas Hermes")
                            Text(AuthenticationContextHolder.shared.userDetails.username)
                                .font(.footnote)
                        }
                        
                        Spacer()
                    }
                }
            }
            
            
            Section ("Roles") {
                ForEach(AuthenticationContextHolder.shared.userDetails.roles, id: \.self) { role in
                        Text(role)
                }
            }
            
            Section("Authentication") {
                LabeledContent("UUID") {
                    Text(DeviceDataService().getUUID().prefix(20) + "...")
                }
                
                Toggle("Mobile Authentication", isOn: Binding.constant(AuthenticationContextHolder.shared.userDetails.deviceIsMobileAuthentication))
                .disabled(true)
                
            }
            
            Section {
                Button(action: nothing) {
                    Text("Logout")
                        .foregroundColor(.red)
                }
                
                if(AuthenticationContextHolder.shared.userDetails.deviceIsMobileAuthentication) {
                    Button(action: nothing) {
                        Text("Revoke Access")
                            .foregroundColor(.red)
                    }
                }
            }
        }
    }
}

#Preview {
    ProfilePageView()
}
